import "server-only";

import type { ZodType } from "zod";
import { getLoggedInUser } from "./appwrite";

/**
 * What every dashboard mutation returns. One shape, so a form never has to
 * guess whether it got a thrown error, a null, or a flag.
 */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export const failure = (
  error: string,
  fieldErrors?: Record<string, string[]>,
): ActionResult<never> => (fieldErrors ? { ok: false, error, fieldErrors } : { ok: false, error });

export const success = <T>(data: T): ActionResult<T> => ({ ok: true, data });

/**
 * Runs a mutation for the signed-in admin only. For actions whose arguments are
 * ids rather than a submitted payload.
 */
export async function authorized<Output>(
  run: () => Promise<Output>,
): Promise<ActionResult<Output>> {
  const user = await getLoggedInUser();
  if (!user) return failure("Unauthorized");

  try {
    return success(await run());
  } catch (error) {
    console.error("Action failed:", error);
    return failure(error instanceof Error ? error.message : "Something went wrong");
  }
}

/**
 * Runs a mutation only for the signed-in admin and only with input that matches
 * its schema. Auth and validation live here so no action can forget either.
 */
export async function guarded<Input, Output>(
  schema: ZodType<Input>,
  input: unknown,
  run: (value: Input) => Promise<Output>,
): Promise<ActionResult<Output>> {
  const user = await getLoggedInUser();
  if (!user) return failure("Unauthorized");

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return failure("Invalid input", flattened.fieldErrors as Record<string, string[]>);
  }

  try {
    return success(await run(parsed.data));
  } catch (error) {
    console.error("Action failed:", error);
    return failure(error instanceof Error ? error.message : "Something went wrong");
  }
}
