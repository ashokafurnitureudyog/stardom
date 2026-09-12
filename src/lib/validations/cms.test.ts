import assert from "node:assert/strict";
import { test } from "node:test";
import { PRODUCT_CATEGORIES } from "../constants/ProductCategories.ts";
import { contactMessageSchema, productSchema } from "./cms.ts";

const product = {
  name: "Executive Manager Chair",
  description: "A chair.",
  category: PRODUCT_CATEGORIES[0],
  collection: "Manager Chairs",
};

test("a product must use one of the seven series", () => {
  assert.equal(productSchema.safeParse(product).success, true);
  assert.equal(productSchema.safeParse({ ...product, category: "Desks" }).success, false);
});

test("array fields default to empty rather than undefined", () => {
  const parsed = productSchema.parse(product);
  assert.deepEqual(parsed.images, []);
  assert.deepEqual(parsed.features, []);
});

test("a product name cannot exceed the column size", () => {
  assert.equal(productSchema.safeParse({ ...product, name: "x".repeat(1001) }).success, false);
});

test("a contact message needs a real address and some substance", () => {
  const message = { name: "A", email: "a@b.com", message: "Hello, I would like a quote." };
  assert.equal(contactMessageSchema.safeParse(message).success, true);
  assert.equal(contactMessageSchema.safeParse({ ...message, email: "nope" }).success, false);
  assert.equal(contactMessageSchema.safeParse({ ...message, message: "hi" }).success, false);
});
