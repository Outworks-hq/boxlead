# BoxLead: Ongoing Service

Build a functional MVP of BoxLead using the attached BoxLead homepage image as the visual source of truth and the product rules below as the operating source of truth.

1. Non-Negotiable Build Control

Do not reinterpret BoxLead as:

Upwork

Fiverr

Contra

LinkedIn Jobs

a staffing agency

an employment marketplace

a generic freelancer marketplace

a project-management platform

a payroll platform

a team-chat product

a managed talent-routing service

BoxLead has its own operating model.

Do not add functionality simply because another marketplace normally has it.

When uncertain, choose the simpler implementation and preserve the BoxLead concept instead of inventing new functionality.

For this MVP, build only what directly supports:

Recurring Services

Company and Obtainer profiles

Search and discovery

Recurring service agreements

Free Pools

Private Service Links

Basic messaging

Recurring payments and provider payouts

Authentication and account management

Do not build PreSales or UpTainer in this MVP.

Do not display them as active products, dashboard modules, navigation items, or homepage features.

They are future concepts and are not part of this build.

2. Core Product Definition

BoxLead is a recurring responsibility marketplace.

Companies use BoxLead to find independent service providers called Obtainers for ongoing, clearly defined responsibilities.

The primary product object is not a one-time job.

It is an ongoing responsibility with an agreed recurring scope and recurring payment.

Examples:

Monthly website maintenance

Weekly design support

Ongoing software support

Recurring quality assurance

Marketing support

Bookkeeping

Recruiting support

Administrative support

AI automation maintenance

The basic relationship is:

Company identifies recurring need → company and Obtainer agree on scope → recurring service begins → company is charged on the agreed schedule → Obtainer remains responsible for the agreed scope while the relationship is active.

If the service is paused or canceled, the recurring responsibility pauses or ends.

Anything outside the agreed scope requires separate approval, additional compensation, or another agreement.

BoxLead enables the relationship.

BoxLead does not control unlimited work or automatically manage the provider.

3. Terminology

Use Obtainer as the primary provider term throughout the product.

An Obtainer is:

An independent individual or small group that provides an ongoing service to an organization through a recurring relationship.

Do not rename Obtainers to freelancers throughout the interface.

The word “freelancer” may be used only where necessary to explain the concept to someone unfamiliar with the BoxLead terminology.

Do not build employee-oriented functionality.

Do not add:

payroll

salary management

employee benefits

PTO

employee onboarding

time clocks

traditional HR tools

traditional employment applications

BoxLead is about independent service relationships.

4. Visual Design — Extremely Important

The attached BoxLead homepage image is the established visual direction.

Do not merely use it as loose inspiration.

Match it closely.

Preserve the same overall design language:

dominant black background

strong white typography

restrained purple accent

simple purple period in the BoxLead wordmark

premium B2B appearance

clean white cards

rounded geometry

large headline typography

generous whitespace

real human imagery where appropriate

minimal clutter

restrained interface density

modern but not futuristic

professional and serious

Do not introduce:

neon

glowing effects

electric graphics

excessive gradients

blue generic SaaS styling

Upwork-style green

Fiverr-style visual language

fake futuristic technology imagery

oversized analytics dashboards

unnecessary charts

excessive cards

decorative UI that does not serve a function

The logged-in application must look like the same BoxLead brand as the homepage.

Do not build a polished homepage and then switch to a generic admin template after login.

Use the same typography, spacing, purple accents, black/white balance, rounded corners, and restrained style throughout.

5. Homepage

Use the attached image as the structural baseline.

Preserve the homepage’s simplicity.

The homepage should remain approximately:

Navigation

Then:

Large hero area

text on the left

real human image on the right

recurring-service relationship card layered into the image area

Then:

Three concise value points

Then:

Simple footer

Do not turn the homepage into a long startup landing page.

Do not automatically add:

testimonials

massive FAQ sections

dozens of categories

pricing tables

analytics screenshots

case studies

blogs

investor-style statistics

multiple CTAs

giant “How It Works” sequences

unless specifically requested later.

The homepage must communicate BoxLead quickly.

Primary calls to action:

Post a need

Find work

Primary message:

recurring services

ongoing responsibilities

companies

Obtainers

reliable long-term service relationships

Free Pools may be introduced as a secondary product benefit.

Do not place PreSales or UpTainer on the homepage.

Do not use fake user counts, fake ratings, fake revenue figures, fake reviews, or fake social proof.

The existing screenshot contains sample social proof. Do not reproduce a fake live number such as “10,000+ users” unless marked clearly as demo content.

6. Public Navigation

Use a restrained public navigation such as:

For Companies

For Obtainers

How It Works

Pricing

Learn More

Log in

Get started

Do not add unnecessary navigation categories.

7. Authentication

Create functional authentication flows for:

Company

A company can:

sign up

log in

create a company profile

manage company information

Obtainer

An Obtainer can:

sign up

log in

create a provider profile

manage service offerings

Let the user select their account type during onboarding.

Keep onboarding short.

Do not create an overcomplicated multi-step HR-style onboarding sequence.

8. Company Profile

Company profiles should support:

Company name

Logo

Short description

Industry

Website

Location

Remote availability where relevant

Public recurring needs

Relationship/review history where appropriate

Do not turn company profiles into social-media pages.

9. Obtainer Profile

Obtainer profiles should prominently show:

Name or provider/group name

Profile photo or logo

Short professional description

Skills

Service categories

Recurring services offered

Pricing

Availability

Relevant work examples/portfolio

Reviews

Completed relationship history

Active relationship information where appropriate

Private Service Link options

The profile should make it easy for a company to understand:

What can this Obtainer continuously handle for us?

Do not make the profile mainly about hourly bidding.

10. Recurring Service Listings

Obtainers can list recurring services they already provide.

Each recurring service should include:

Service title

Description

Scope

What is included

Limits/exclusions

Recurring price

Billing frequency

Expected service frequency

Availability

Relevant category

Optional work examples

Examples:

Monthly Website Maintenance

Weekly Design Support

Ongoing QA Coverage

These should look and feel like ongoing responsibilities, not one-time Fiverr-style gigs.

11. Company Recurring Needs

Companies can post recurring needs.

Each need should include:

Responsibility title

Description

Scope

Required skills

What needs to be covered

Limits or expectations

Recurring compensation

Billing frequency

Expected work frequency

Start timing

Remote/location requirement

Relevant category

Examples:

Maintain our website bugs each month

Handle weekly design updates

Provide ongoing QA for product releases

Maintain our automation workflows

Do not design this primarily as:

hourly bidding

one-time project posting

full-time job recruiting

12. Search and Discovery

Company searching for Obtainers

Companies should be able to search and filter by:

Service category

Skills

Recurring service offered

Weekly or monthly pricing

Availability

Reviews

Remote/location status

Relevant experience

Do not create automatic matching as the primary model.

Companies browse and choose.

BoxLead may provide basic relevance ordering, but do not say:

“We assigned your expert”

“Your perfect freelancer has been matched”

“BoxLead selected this provider”

The company controls the choice.

Obtainer searching for recurring needs

Obtainers should be able to browse/filter by:

Responsibility

Category

Scope

Recurring compensation

Billing frequency

Expected frequency

Company

Start timing

Remote/location requirement

Keep search clean and easy to scan.

13. Interest and Selection Flow

When a company posts a recurring need:

Obtainers can view the need.

Interested Obtainers can express interest or submit a simple response.

The company can review interested Obtainers.

The company can view their profiles.

The company can message them.

The company selects the Obtainer it wants.

Both sides review and confirm the recurring scope.

The recurring service agreement becomes active.

Do not create an auction-style race to the lowest bid.

Do not make BoxLead automatically assign someone.

14. Recurring Service Agreement

This is one of the most important parts of BoxLead.

The agreement page should clearly display:

Company

Obtainer

Responsibility/service name

Description

Scope

Included work

Limits/excluded work

Recurring price

Billing frequency

Start date

Current status

Next billing date

Payment method

Pause controls

Cancel controls

Relationship history

Basic communication access

Possible statuses:

Pending

Active

Paused

Canceled

Completed/Ended

The visual design should clearly communicate that this is an ongoing relationship.

Do not style it like a one-time project contract.

15. Company Dashboard

Keep the dashboard restrained.

Do not build an analytics-heavy executive dashboard.

A company dashboard should focus on useful operational information such as:

Active Services

Recurring Needs

Free Pools

Recent Messages

Upcoming Payments

Recent Activity

Example navigation:

Overview

Recurring Needs

Obtainers

Active Services

Free Pools

Messages

Payments

Settings

Do not add random modules.

16. Obtainer Dashboard

Keep the Obtainer dashboard equally simple.

Focus on:

Active Relationships

Available Recurring Needs

My Services

Free Pools

Private Links

Recent Messages

Upcoming Earnings

Recent Activity

Navigation can include:

Overview

Find Work

My Services

Active Relationships

Free Pools

Private Links

Messages

Earnings

Profile

Settings

Do not turn it into a complicated business-management suite.

17. Free Pools

A Free Pool is a reusable private network of independent contributors associated with a company, organization, or community.

The purpose is to let companies maintain access to people they already know or want to work with repeatedly instead of searching the full marketplace every time.

A company can:

Create a pool

Name the pool

Add or invite contributors

View pool members

Remove members

Post opportunities inside the pool

Set compensation

Define scope

Notify eligible members

See who accepts

Review submitted work

Approve completion

Release payment

Contributors can:

Belong to multiple pools

View their pools

Receive available opportunities

Review scope and compensation

Accept opportunities

Complete the work

Submit completion

Receive payment after approval

The interaction should feel similar to:

A company already has a trusted or familiar network and can send opportunities to that network quickly.

Do not make Free Pool another public marketplace.

Do not make contributors employees simply because they belong to a pool.

Pool membership does not guarantee work.

Contributors choose which opportunities they accept.

18. Free Pool Relationship Logic

Do not force one rigid sequence.

A contributor may enter a company’s Free Pool because:

the company previously worked with them

they have an existing relationship

the company wants continued access to them

they were invited into the company’s network

they joined an eligible community/company pool

However, the typical long-term BoxLead flow can look like:

Find provider → work together → build trust → keep provider in Free Pool → send future opportunities without restarting marketplace search.

Do not build a complicated “trust certification” system.

19. Trust Model

BoxLead does not automatically declare every Obtainer trustworthy.

Trust develops through:

profile information

reviews

service history

successful work

relationship duration

previous company experience

repeat relationships

Do not write:

“All Obtainers are vetted”

“BoxLead-certified trusted professionals”

“Guaranteed experts”

unless such a system is explicitly added later.

Use language such as:

Build trusted relationships

See reviews and work history

Keep providers you work well with

Create your own trusted network

20. Private Service Links

Private Service Links allow Obtainers to bring their own clients into a recurring BoxLead service relationship.

The flow:

Obtainer creates a recurring service.

Defines scope.

Sets recurring price.

Sets billing frequency.

Generates a private BoxLead link.

Shares the link externally.

Client opens the page.

Client reviews the service.

Client agrees to the terms.

Client adds payment information or logs in.

Client subscribes.

The relationship appears inside the Obtainer and company/client accounts.

Recurring billing begins.

The public private-link page should feel like a polished service card/page, not a generic checkout screen.

These links are conceptually PartyTap-powered, but do not build PartyTap itself.

The BoxLead user should experience this as a native BoxLead feature.

21. Messaging

Include basic messaging between companies and Obtainers.

Messaging should support:

recurring need discussions

scope questions

agreement discussions

active relationship communication

Free Pool opportunity communication

Do not build:

Slack-style channels

complicated team chat

video calling

full project collaboration suites

Keep messaging simple.

22. Payments

Build the UI and data structure with future Stripe-compatible implementation in mind.

Do not invent complicated financial products.

Company side

Support UI for:

Saved payment method

Current active recurring charges

Next charge date

Payment history

Pending payments

Successful payments

Failed payment state

Pause/cancel relationship controls

Obtainer side

Support UI for:

Current recurring earnings

Pending payout

Completed payout

Earnings history

Relationship-specific payment history

Free Pool tasks

Support:

agreed task price

pending payment

company approval

payout after approval

Use realistic demo data only.

23. Reviews and Relationship History

Companies should be able to leave reviews after meaningful work or relationships.

Obtainer profiles can show:

average rating

review count

written reviews

completed relationships

repeat relationships

Do not fabricate real ratings in production.

Use demo data only for preview states.

Relationship history is more important than fake “verified expert” labels.

24. Demo States

The MVP should feel usable and clickable.

Create realistic demo states for:

brand-new company account

active company account

brand-new Obtainer account

active Obtainer account

search results

Obtainer profile

company profile

recurring need

recurring service listing

interested Obtainers

active recurring agreement

paused agreement

Free Pool

Free Pool opportunity

Private Service Link

payment history

earnings history

basic messages

Buttons should lead somewhere meaningful.

Do not create dead UI wherever reasonable.

25. Responsive Design

Build for desktop and mobile.

Desktop should closely preserve the wide, premium layout language of the attached homepage image.

Mobile should be redesigned intelligently for the smaller screen.

Do not simply shrink desktop panels.

Maintain:

clear hierarchy

generous spacing

simple navigation

readable cards

easy touch targets

26. Do Not Build PreSales

PreSales is a future BoxLead product.

Do not build:

PreSales navigation

campaign creation

consumer trial offers

user rewards

targeting

PreSales analytics

product testing flows

conversion scoring

PreSales dashboards

Do not put PreSales on the homepage.

Ignore all future PreSales notes during this MVP build.

27. Do Not Build UpTainer

UpTainer is a future enterprise layer for mature BoxLead relationships.

Do not build or display it in this MVP.

Do not add:

enterprise integration dashboards

internal company permission systems

deeper external-provider access tools

enterprise workflow integrations

UpTainer navigation

The future concept exists only so the current BoxLead architecture does not block it later.

28. BoxLead Is Not DevWork

Do not automatically route technical problems to managed experts.

That is not the BoxLead model.

BoxLead means:

“I want to browse providers, compare them, choose who I want, establish an ongoing relationship, and potentially keep that provider in my network.”

Do not use language such as:

We handle your technical problem

We route your problem to an expert

Managed expert network

Assigned specialist

Instant expert match

That would change BoxLead into a different product.

29. MVP Technical Philosophy

Build as much of the visible and navigational core experience as practical, but keep the underlying product logic narrow.

Prioritize:

clean reusable components

realistic page states

clear data models

functioning navigation

forms

responsive layouts

consistent design

sensible component architecture

Do not over-engineer:

recommendation algorithms

AI matching

enterprise permissions

advanced analytics

complex dispute systems

internal collaboration suites

custom financial infrastructure

If backend functionality cannot be completed immediately, create a clean demo-ready structure that can later connect to production services.

Do not pretend unfinished functionality is production-ready.

30. Visual Consistency Rule

Every major page should feel like BoxLead.

Use the attached screenshot continuously as the brand reference.

When designing:

dashboards

profiles

search

agreement pages

Free Pools

messages

payments

Private Links

ask:

Would this visually look natural if it were another page from the same BoxLead site shown in the reference image?

If not, revise it.

Do not default to generic marketplace templates.

31. Final Product Rule

Before adding any feature not explicitly described above, ask:

Does this directly support recurring service relationships, Free Pools, Private Service Links, discovery, communication, or payment for those relationships?

If the answer is no, leave it out.

If there is ambiguity, do not invent a large feature.

Use the simplest reasonable implementation.

The MVP should feel:

complete enough to use, narrow enough to understand, and visually consistent with the approved BoxLead reference.

The purpose of this first build is to make the actual BoxLead concept usable and testable—not to imitate an existing marketplace or fill the product with every possible feature.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07d56317-4151-4271-a26c-8fcfa549749e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
