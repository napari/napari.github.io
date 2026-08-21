(napari-triage)=

# Triage

This guide describes how napari curates its issue trackers and pull requests.
A healthy tracker makes the project easier to use and to contribute to: issues
are clearly described, duplicates are linked, and maintainers can focus on
issues and pull requests that are ready for their attention.

Triaging does not require any particular expertise in napari's internals and
is extremely valuable to the project. We welcome anyone to participate in
issue triage! When in doubt, always refer back to our
[mission and values](mission-and-values).

## Anyone can help triage

Triaging starts with commenting. Community members and contributors who are
not part of the [napari organization](https://github.com/napari) do not have
permissions to change labels, add milestones, or close issues, but they can
still be enormously helpful by:

- documenting issues that are missing elements needed to reproduce a problem,
  such as code samples;
- suggesting better use of code formatting (e.g. triple backticks in markdown);
- suggesting a clearer title or description;
- linking to related issues or pull requests and briefly describing how they
  are related, for instance "see also #xyz";
- verifying that an issue is reproducible;
- classifying an issue as a feature request, a long-standing bug, or a
  regression.

If you do not have enough GitHub permissions to do something, leave a comment
with your recommendation. Triagers and core team members will see it.

## The triage team

The triage team is a group of community members who have demonstrated that
they can help maintain napari with care. Being invited to the triage team is a
mark of trust: the core team believes you can represent napari's values and
help maintain the project with care. There is no
expected time commitment or quota of work. It is also a *promise from us*: we
will mentor and shepherd you as you grow into the role.

For some, the triage team is a stepping stone toward core team membership. For
others, it is simply a rewarding place to make a lasting contribution. Both
are entirely fine — the role is a valued destination in its own right, and
there is **no expectation** that you continue beyond it.

Triage team members are part of the `@napari/triage` GitHub team and can
exercise the [triage role](#permissions-and-non-permissions) on the public
repositories in the napari organization.

## Permissions and non-permissions

Members of the triage team **can**:

- apply labels to issues and pull requests;
- edit issue titles and descriptions;
- assign issues and add them to milestones;
- close and reopen issues and pull requests

Members of the triage team **cannot**:

- push commits or merge pull requests;
- set a pull request to draft or ready for review;
- re-run or approve workflow runs;
- edit repository or branch protection settings.

When closing a pull request, generally consult a core team member first so
that the author receives careful consideration of their work. Triagers may
close a pull request on their own when it is clearly not going to be merged,
for example a change to deprecated functionality or a fix for a bug that can
no longer be reproduced. When in doubt, ask a core team member.

## What to focus on

Your fresh eyes are most valuable on *recently arrived* issues and pull
requests, which need less accumulated context to understand. Digging into old
or complex issues is entirely optional — please do it if you are curious, but
never feel pressured. When in doubt, ask a core team member.

## Triage workflow

The following workflow is a good way to approach issue triage:

1. **Thank the reporter** for opening an issue. The issue tracker is many
   people's first interaction with the napari project, and we want it to be a
   welcoming, pleasant experience.
2. **Is this a usage or support question?** If so, close it with a polite
   message pointing the reporter to the
   [#napari tag on the image.sc forum](https://forum.image.sc/tag/napari) or
   the [napari Zulip](https://napari.zulipchat.com/).
3. **Is the necessary information provided?** If crucial information is
   missing (napari version, Python version, operating system, Qt backend),
   politely ask the reporter to provide it, `napari --info` is especially
   helpful context.
4. **Is the issue minimal and reproducible?** For bug reports, we ask for a
   minimal reproducible example. If you cannot reproduce the issue, report
   that along with your operating system, Python, and napari versions. If we
   need more information, label the issue with `triage:need to reproduce`.
5. **Is this a regression?** Regressions are the highest priority. Try to
   determine when the regression happened by running the reproduction code
   against older versions of napari or by using `git bisect`. Milestone
   confirmed regressions for the next bug fix release.
6. **Is this a duplicate?** If a new issue seems to be a duplicate, point to
   the original issue. If it is a clear duplicate, close it with
   `triage:duplicate` and encourage the reporter to chime in on the original
   issue. If the new issue provides relevant information, add it to the
   original issue.
7. **Make sure the title accurately reflects the issue.** If it is not clear,
   edit it yourself.
8. **Add relevant labels** and
   consider tagging `contribute:good first issue` when appropriate.

## Closing issues

When uncertain whether an issue should be closed, strive for consensus with
the original poster and possibly seek relevant expertise from core team
members. In general:

- usage and support questions are closed with a pointer to the forum;
- clear duplicates are closed with a pointer to the original issue;
- issues that cannot be reproduced are closed after leaving time (at least a
  week) for the reporter to add extra information;
- issues that have been resolved in the current version of napari are closed.

If you have any doubt about whether to close an issue, ask a core team member
or in the `#triage` channel before taking action. Always treat every
contributor kindly and with respect, and follow our
[code of conduct](napari-coc).

## Good first issues

If an issue is clearly defined, the fix is relatively straightforward, and
there is consensus on the solution, label it as `contribute:good first issue`
and consider adding a hint as to where in the code base to look to get
started. Good first issues are intended to onboard newcomers with a genuine
interest in improving napari, so the heavy use of AI tools to resolve them is
discouraged. All contributions must comply with our
[AI policy](ai-contributions).

## Communication and escalation

Triage coordination happens in the `#triage` channel on
[napari Zulip](https://napari.zulipchat.com/), which is open to everyone.
Triage team members participate in the existing public community channels and
[community meetings](meeting-schedule) like any community member.
Prefer asynchronous communication — issues and Zulip threads — where possible,
as it is easier for a global community to consume.

If an issue or pull request needs a maintainer's attention, mention the
relevant core team members or bring it up in the `#triage` channel.

## The pull request triage board

The [napari pull request triage board](https://github.com/orgs/napari/projects/35)
is an org-level GitHub project board that automatically tracks every open pull
request across the napari organization. It is populated by the
[pr-triage-board-bot](https://github.com/jupyter/pr-triage-board-bot), a tool
designed to "scale maintainer intuition" — the thinking behind it is described
in [this blog post](https://medium.com/@yuvipanda/scaling-maintainer-intuition-with-pull-request-triage-boards-779f2387498b).

For each open pull request, the bot computes a set of fields so you can see at
a glance where a pull request is in its lifecycle:

| Field | Values it can take |
|---|---|
| Author Kind | Bot, Maintainer, First Time Contributor, Early Contributor, Seasoned Contributor |
| Opened At | Date the pull request was opened |
| Total Lines Changed | Size of the change |
| Maintainer Engagement | No / Single / Multiple Maintainer Engagement |
| CI Status | Tests Passing, Tests Failing |
| Merge Conflicts | No Merge Conflicts, Merge Conflicts |
| Approval Status | Changes Requested, Maintainer Approved |

`Author Kind` is determined by the author's history in the organization: an
author with write access or above is marked as a Maintainer, while others are
classified by their number of merged pull requests (first time, early, or
seasoned contributor). This is a helpful prioritization signal — pull requests
from first-time and early contributors are often where triagers' and
maintainers' attention is most valuable, while bot pull requests (for example
from dependabot or pre-commit) can be handled in batches.

The bot maintains the board's fields and their values: it recomputes them
deterministically on a schedule and reverts manual edits, and it removes pull
requests from the board once they are merged or closed. The *views* (tabs) on
the board, however, are yours to customize — triagers can create their own
views and filters to match how they like to work. If a pull request on the
board looks like it needs attention (failing tests, a merge conflict, or no
maintainer engagement), that is exactly the kind of thing to bring up in the
`#triage` channel or to flag for a core team member.

## Joining the triage team

New triage team members are onboarded as follows:

1. A contributor consistently triages issues and pull requests, demonstrating
   good judgment and our community values.
2. A core team member or steering council member nominates them, first
   approaching the prospective member privately to gauge their interest and
   availability.
3. The nomination is announced to the core team and accepted by lazy
   consensus (no objections within a reasonable timeframe, typically one
   week).
4. An organization owner adds the nominee to the `@napari/triage` GitHub team,
   first inviting them as an organization member if needed.
5. The new triager is paired with a core team mentor who reviews their early
   triage actions and answers questions until they are comfortable working
   independently.
6. Their arrival is welcomed publicly in the community channels.

## Stepping down and inactivity

Triage team members can step down at any time, for any reason, by asking a
team maintainer or organization owner to be removed — no forms or notice
period. Being a triager is not a lifetime appointment. Once a year, alongside
the January membership tidy-up, a maintainer reviews the triage team roster
and gently reaches out to members who have been inactive, giving them the
choice to stay or step down. This is not punitive and carries no stigma.
Returning to the team is easy: a former triager can be re-added by a core team
member with lazy consensus, without re-running the full nomination process.

## For core team members

Core team members do triage too, and shepherd triagers as they grow into the
role. When you review a pull request, make sure labels and milestones are set
as described in the [core team member guide](core-dev-guide). When you notice
a contributor consistently helping with triage, consider nominating them for
the triage team (see [joining the triage team](#joining-the-triage-team)
above).
