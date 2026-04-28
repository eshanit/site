# PEGISUS Website — Improvements Blueprint

> **Scope:** Visual, UI/UX, responsiveness, and performance adjustments only.
> Colors (blues palette) are locked and will not change.
> Content from the existing website is the only source — no new copy is being added.
>
> **Sources:** feedback_1.pdf (internal reviewer), feedback_2.pdf (Zambia YAB), feedback_3.pdf (Zimbabwe YAB, 12 participants)

---

## Priority Key

- `P1` — Fix immediately (broken, inaccessible, or reported by multiple sources)
- `P2` — High value improvement (reported by at least one group, clear UX win)
- `P3` — Nice to have / lower effort polish

---

## 1. Performance

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 1.1 | Loading speed is slow on some pages — audit and optimize | P1 | ZIM YAB (3/12 negative) |
| 1.2 | Broken links exist — audit all internal and external links and fix | P1 | ZIM YAB (2/12 reported) |
| 1.3 | Images are the likely culprit for slow load — ensure all images go through `<NuxtImg>` with proper `width`, `height`, `format="webp"`, and `loading="lazy"` | P1 | ZIM YAB |
| 1.4 | Review bundle size — check for unnecessarily large client-side JS chunks in the Nuxt build output | P2 | ZIM YAB |

---

## 2. Mobile Responsiveness

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 2.1 | Several features are not viewable in portrait orientation on mobile — full audit needed across all pages | P1 | Zambia YAB |
| 2.2 | `Where We Work` map/country layout — verify it is usable and readable on small screens | P1 | Zambia YAB |
| 2.3 | Navigation bar — test hamburger menu, dropdowns, and icon spacing on small screens | P1 | Zambia YAB |
| 2.4 | Contact page — heavy layout, ensure form and all sections stack cleanly on mobile | P2 | feedback_1.pdf |
| 2.5 | `Who We Are` team cards — ensure grid collapses properly on mobile | P2 | general audit |

---

## 3. UI Bugs & Layout Fixes

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 3.1 | Homepage hero: the "E" in *Empower* is partially obscured by the background image — fix text contrast or adjust image overlay opacity | P1 | Zambia YAB |
| 3.2 | Dark/light mode toggle is obstructing other navbar icons — reposition it so it does not crowd the icon row | P1 | Zambia YAB |
| 3.3 | `Who We Are > Our Team`: small redundant "Our Teams" blue label at the very top of the section — remove it | P2 | feedback_1.pdf |
| 3.4 | `Who We Are > Our Partners`: small redundant "Partnerships" blue label at the top — remove it | P2 | feedback_1.pdf |
| 3.5 | `Who We Are > Our Team`: the `+` expand icon shown for the Zambia and Zimbabwe teams appears to be a placeholder — either wire it up or remove it if unused | P2 | feedback_1.pdf |
| 3.6 | `Where We Work > Regional Context` box is visually sparse — either populate it with the existing content it is meant to show, or remove the box entirely to reduce clutter | P2 | feedback_1.pdf |
| 3.7 | `Where We Work`: once a country is selected from the left-hand list, there is no way to return to the default all-countries-highlighted view — add a "View All" / reset button | P1 | feedback_1.pdf |

---

## 4. Typography & Readability

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 4.1 | Heading font sizes feel small on some sections — increase heading scale, especially for section titles and hero headings, to improve visual hierarchy | P2 | ZIM YAB |
| 4.2 | Body text density — break up long paragraphs on `What We Do` and `Who We Are` pages with more whitespace or visual breaks | P2 | Zambia YAB (youth-friendly language note) |
| 4.3 | Ensure line-height and letter-spacing on body copy is comfortable for reading on mobile (minimum `line-height: 1.6`) | P2 | ZIM YAB |

---

## 5. Navigation & Information Architecture (UX)

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 5.1 | Contact page is information-dense and overwhelming — split into two clear sub-sections: **Partner with PEGISUS** and **Send Us a Message**, using tabs or a two-panel layout rather than one long scroll | P2 | feedback_1.pdf |
| 5.2 | Search function feels non-intuitive — simplify the UI: a single prominent search bar, clear placeholder text, and clean results list with page context labels | P2 | Zambia YAB |
| 5.3 | `What We Do > Clinical Trial in Progress` section: the external link should clearly state it directs to `clinicaltrials.gov` — update link label/tooltip to read "Read more about our study on clinicaltrials.gov" | P2 | feedback_1.pdf |
| 5.4 | Breadcrumb or back-navigation — ensure users always have a clear path back, especially within nested `What We Do` and `Who We Are` sub-pages | P3 | general audit |

---

## 6. Imagery & Visual Engagement

> Note: The client has confirmed blues are the locked palette. "More colorful" feedback from ZIM YAB is addressed through image richness, not color changes.

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 6.1 | Homepage hero image does not clearly communicate the PEGISUS mission (transition from substance use to productive livelihoods) — replace with a more on-message image when one is available; for now, ensure current image has sufficient contrast overlay | P2 | Zambia YAB |
| 6.2 | Images across the site are limited — add a **Photo Gallery** section (UI shell) where program activity photos can be added; the gallery component should be built and ready even if populated later | P2 | Zambia YAB |
| 6.3 | YAB member representation is absent from imagery — flag to client that sourcing photos of actual YAB members/youth participants will significantly improve authenticity and engagement | P2 | ZIM YAB |
| 6.4 | Section imagery feels generic — where possible use images that reflect both the vocational training and the substance use prevention aspects of the program in equal measure | P2 | Zambia YAB |

---

## 7. Minor Content Corrections (no new content — fixing existing)

| # | Issue | Priority | Source |
|---|-------|----------|--------|
| 7.1 | `Where We Work > Zambia` page: skills listed are incorrect — update to: rough carpentry, steel fixing, bricklaying, and plastering | P1 | Zambia YAB |
| 7.2 | `Get In Touch` footer section content — ensure this information is also surfaced in the Contact page (currently it may only appear in the footer scroll) | P2 | feedback_1.pdf |

---

## 8. Out of Scope for This Phase

These items came up in feedback but are excluded from this round of work:

| Item | Reason Deferred |
|------|----------------|
| Homepage section restructure / content merging (What is PEGISUS, The Challenge, Our Approach as dropdowns) | Content reorganisation — requires client sign-off on new structure |
| Renaming "What We Do" to "Program Overview" or similar | Content/IA decision for client |
| Relocating Funding Partners to Who We Are > Partners | Content reorganisation |
| Language translations (Nyanja, Shona, etc.) | Major feature requiring new infrastructure and translated content |
| Adding youth empowerment stories / testimonials | Requires new content from client |
| Adding Vocational Training partner logos | Requires assets from client |

---

## Suggested Implementation Order

1. **P1 bug fixes first** (§3.1, §3.2, §3.7, §7.1 — broken/inaccessible things)
2. **Performance audit** (§1.1–1.4 — impacts all users)
3. **Mobile responsiveness sweep** (§2.1–2.5 — systematic page-by-page pass)
4. **Navigation & UX improvements** (§5.1–5.3)
5. **Typography & layout polish** (§4.1–4.3, §3.3–3.6)
6. **Gallery component build** (§6.2 — build the UI shell, content to be added later)
7. **Final visual audit** (§6.1, §6.3–6.4, §7.2)
