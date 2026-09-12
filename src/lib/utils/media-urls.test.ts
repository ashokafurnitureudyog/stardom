import assert from "node:assert/strict";
import { test } from "node:test";
import { fileIdFromUrl } from "./media-urls.ts";

test("reads the file id from an Appwrite view URL", () => {
  assert.equal(
    fileIdFromUrl(
      "https://fra.cloud.appwrite.io/v1/storage/buckets/685ccc/files/686226a7002789eb33d2/view?project=67d9",
    ),
    "686226a7002789eb33d2",
  );
});

test("works for a self-hosted endpoint", () => {
  assert.equal(
    fileIdFromUrl("https://appwrite.stardom.co.in/v1/storage/buckets/b1/files/abc123/view"),
    "abc123",
  );
});

test("ignores URLs that are not stored files", () => {
  assert.equal(fileIdFromUrl("https://images.unsplash.com/photo-166671862"), null);
  assert.equal(fileIdFromUrl(""), null);
});
