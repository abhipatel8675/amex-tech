import assert from "node:assert/strict";
import { fillTemplate, TEMPLATES } from "./leadEmails.ts";

const lead = { name: "Sam Lee", company: "Lee Plumbing", service: "Website", quote_amount: 1299 };
assert.equal(fillTemplate("quote", lead).subject, "Quote for Lee Plumbing");
assert.match(fillTemplate("quote", lead).body, /^Hi Sam,\n/);
assert.match(fillTemplate("quote", lead).body, /\$1,299/);
assert.match(fillTemplate("quote", { ...lead, quote_amount: null }).body, /\[price\]/);
assert.equal(fillTemplate("inquiry", { name: null, company: null, service: null, quote_amount: null }).subject, "Your website project");
assert.match(fillTemplate("inquiry", { name: null, company: null, service: null, quote_amount: null }).body, /^Hi,\n/);
const last = { subject: "Re: Your website project", created_at: "2026-11-01T12:00:00Z" };
assert.equal(fillTemplate("followup", lead, last).subject, "Re: Your website project");
assert.match(fillTemplate("followup", lead, last).body, /Nov 1 about Your website project/);
assert.equal(fillTemplate("nope", lead).subject, "");
assert.ok(TEMPLATES.every((t) => t.body.includes("Abhi Patel")));
console.log("leadEmails tests pass");
