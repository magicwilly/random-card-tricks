# Random Card Tricks

A playful discovery tool: a random classic card trick, local keepers, history, and creative prompts.

Serve `public/` with any static server. Deploy with Wrangler using `wrangler.jsonc`.

The original root files and full 352-entry `tricks.json` are preserved. The preview serves 55 manually inspected tricks from that collection. Titles are set in title case, obvious word-spacing errors and PDF page markers are repaired, and paragraph breaks are added. Batch 02 recovers titles by comparison with another edition and publisher/index contents. No missing methods have been invented. The book is identified from its extracted introduction as *Encyclopedia of Card Tricks*. Page references use the repository's PDF page metadata, not verified printed pagination. Source edition/publication details have not been independently checked.

Favorites are stored only in this browser. Random deals do not repeat within a deck cycle during the visit. Back navigation retraces deals; dealing forward after going back returns to the next item in that history. Creative prompts are a separate, fixed collection and do not alter the historical text.

Batch 02 reviews 12 original records and supplies 18 cleaned tricks. One compound section is held for method verification. See `review/` for provenance, excluded text, and the batch manifest. Source PDF ranges remain inherited ranges, not verified pagination for the split tricks. Unknown originators display “Source unknown”; the book source remains identified.

Batch 03 reviews another 12 records, adds 12 tricks, and holds A Strange Coincidence for a missing deck-exchange instruction. Supplied PDF reference-01 confirms titles and page ranges. Dependent variations include an expandable copy of the base routine. The three supplied PDFs were indexed locally; the full PDFs are not added to the public site or repository.

Live domain: https://randomcardtricks.com (registered with Cloudflare for one year on 2026-10-15; automatic renewal disabled). www and HTTP redirect to canonical HTTPS apex. All Sleight School mentions link to https://sleightschool.com. Worker source handles redirects before serving static assets.

Batch 04 reviews 12 more records and supplies 13 tricks after splitting two compound records; Backs Up is held for method/wording verification. Total reviewed records: 48; pending: 304.
