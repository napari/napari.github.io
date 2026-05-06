(napari-governance)=

# Governance model

## Abstract

The purpose of this document is to formalize the governance process used by the
`napari` project, to clarify how decisions are made and how the various
elements of our community interact.

This is a consensus-based community project. Anyone with an interest in the
project can join the community, contribute to the project design, and
participate in the decision making process. This document describes how that
participation takes place, how to find consensus, and how deadlocks are
resolved.

## Roles and responsibilities

The napari organization and software ecosystem is supported by a broad
community of users, our contributors, and the napari team. The napari team is
responsible for all project governance and is anchored by two bodies: the
napari core team members, and the napari steering council. In this section, we
define the different bodies supporting the project, and describe the roles and
responsibilies of the napari core team members and the steering council.

### The community

The napari community consists of anyone using or working with the project
in any way.

### Contributors

A community member can become a contributor by interacting directly with the
project in concrete ways, such as:

- proposing a change to the code via a GitHub
  [GitHub pull request](https://github.com/napari/napari/pulls);
- reporting issues on our
  [GitHub issues page](https://github.com/napari/napari/issues);
- proposing a change to the documentation, or
  tutorials via a [GitHub pull request](https://github.com/napari/docs/pulls);
- discussing the design of napari or its tutorials on in existing
  [issues](https://github.com/napari/napari/issues) and
  [pull requests](https://github.com/napari/napari/pulls);
- discussing examples or use cases on the
  [image.sc forum](https://forum.image.sc/tag/napari) under the #napari tag; or
- reviewing [open pull requests](https://github.com/napari/napari/pulls)

among other possibilities.

Note that community members proposing code changes, reporting issues,
discussing design, or reviewing pull requests for **any** project in the
[napari GitHub organization](https://github.com/napari) are also deemed
contributors. Some of the associated projects community members may be
interested in are:

- The [napari plugin manager](https://github.com/napari/napari-plugin-manager)
  for installing plugins within the viewer
- The [napari packaging](https://github.com/napari/packaging) project that
  handles our one-click bundled installer
- The [napari hub](https://github.com/napari/hub-lite) website for browsing
  available plugins
- The [napari plugin
  template](https://github.com/napari/napari-plugin-template) for quickly
  generating a plugin from scratch
- Plugins maintained by the napari team such as
  [napari-tiff](https://github.com/napari/napari-tiff) for reading and writing
  TIFF files, and [napari-metadata](https://github.com/napari/napari-metadata)
  for displaying and editing layer metadata

Any community member can become a contributor, and
all are encouraged to do so. By contributing to the project, community members
can directly help to shape its future.

Contributors are encouraged to read the [contributing guide](napari-contributing).

### Core team members

```{note}
We used to refer to core team members as core developers. However, we felt
that this title did not accurately reflect the broad range of contributions
we value from our community. We have therefore updated the title to be more
inclusive.

Some historical artifacts e.g. our google mailing group and our GitHub team
cannot be renamed. Additionally, NAPs and release notes have not been retroactively
updated to reflect the new role title.
```

Core team members are community members that have demonstrated continued
commitment to the project through ongoing contributions. They
have shown they can be trusted to maintain napari with care. Becoming a
core team member allows contributors to merge approved pull requests, cast votes
for and against merging a pull-request, and be involved in deciding major
changes to the API, and thereby more easily carry on with their project related
activities.

Aside from technical contributions, core team members support the Steering
Council in carrying out the project's mission. They participate in discussion
about the project's present and future goals and direction, collaborate with
the SC to establish and update the project's development roadmap, and support
the napari community at large.

Core team members are expected to review code contributions while adhering to the
[core team member guide](core-dev-guide). New core team members can be nominated
by any existing core team member, and for details on that process see our core
team member guide. Core team members can choose to step down from their role and
become "emeritus" core team members if they are no longer involved with the project,
or feel they do not have sufficient time to dedicate to their role. Emeritus core
team members can request or be invited to become active core team members at
a later date and with consensus from currently active core team members.

For a full list of core team members see our [About the project and team](team) page.

### Steering council

The purpose of the Steering Council (SC) is to ensure smooth progress from the
big-picture perspective. The SC is ultimately responsible for all strategic and
operational dimensions of the napari project. This includes, but is not limited
to all legal, financial and operational decisions. The SC actively works to
carry out the napari project's mission, in accordance with the project's values
and with the support of the core team members. SC members are
expected to participate in strategic planning, approve changes to the
governance model, and make decisions about funding granted to the project
itself.

The SC has the responsibility to:

- Pursue, raise, allocate and manage all project funding.
- Coordinate, manage and select candidates for all roles and personnel employed
  or contracted to the napari project.
- Manage all legal aspects of the napari project, such as contracts, compliance
  and copyright, with support from NumFOCUS.
- Manage the project's relationship with NumFOCUS as a Sponsored Project,
- Ensure the timely delivery of all deliverables, milestones, reports and other
  commitments associated with restricted funding such as grants or contracts.
- Coordinate and oversee the project development roadmap, and its delivery, in
  collaboration with the core team members and the broader community.
- Hold a monthly meeting, and distribute summaries of these meetings to the
  core team members.
- Ensure the publication of an annual State of Napari report that provides a
  summary of the previous year's activities across the entire napari community,
  and highlights the current and future direction of the project.
- Members of the SC also have the "owner" role within the [napari GitHub
  organization](https://github.com/napari)
  and are ultimately responsible for managing the napari GitHub account, the
  [@napari@fosstodon.org](https://fosstodon.org/@napari) Mastodon account, the
  [napari website](https://napari.org), and other similar napari owned
  resources.
- When the core team member community (including the SC members) fails to reach
  a consensus in a reasonable timeframe, the SC is the entity that resolves the
  issue.

SC members may be core team members but can also be nominated from the
community at large. Changes that impact the full project require analysis
informed by long experience with both the project and the larger ecosystem. As
such, SC members should be community members who have interacted heavily with
the project and its ecosystem, whether they be users, plugin developers, direct
napari contributors, or involved with the project in other ways e.g. attending
community events, supporting users of napari, etc.

The SC will be no less than three members and no more than five members,
with a strong preference for an odd number to ensure a simple majority vote
outcome is always possible, and a preference for five members to ensure a
diversity of voices. All deadlocked votes of the SC will be postponed until
there is an odd number of members and another vote can be held. A majority of the
SC will not be employed by the same entity. One seat on the SC is reserved
for a member elected by the [Institutional and Funding Partner Advisory Council](#institutional-and-funding-partners),
as detailed below.

The SC membership, including the Institutional and Funding Partner (IFP) seat, is revisited every January.
Current SC members must actively reaffirm their membership for the upcoming
year, or choose to resign. SC members who do not actively engage with the SC
duties are expected to resign. Should an SC member resign, they remain eligible
for rejoining the SC at a later date, via the standard process described below.

New members for vacant spots are added by nomination by a core team member or
SC member, and subsequent vote. Nominees should have demonstrated long-term,
continued commitment to the project and/or its community, and its [mission and
values](mission-and-values). Before nomination, the core team should approach
the prospective nominee to gauge their interest and availability in the role.
A nomination will result in discussion among current core team members and SC
members, that cannot take more than a month and then admission to the SC by
consensus, as defined [below](#decision-making-process). During that time
deadlocked votes of the SC will
be postponed until the new member has joined and another vote can be held. The IFP seat
is elected by the IFP Advisory Council.

Any core team member or SC member can request the explusion of an SC member
whom they believe has acted in a manner contrary to the project's mission and
values, or who has failed to participate in Steering Council activities. This
may be done by approaching another SC member, who is then responsible for
calling a vote and managing the process, as detailed below.

Written notice of the proposed expulsion must be given to the member at least
21 days before a vote is held. As soon as a removal request has been made, the
member's permissions will be reduced to prohibit destructive actions on
relevant platforms. Before the vote, the member must be given reasonable
opportunity to appeal. The member will be expelled if the vote, by secret
ballot, of the core team members and Steering Council achieves a 75% majority.
An expelled member may not be readmitted unless a vote for readmission, by
secret ballot, of the core team members and Steering Council achieves a 75%
majority.

The SC may be contacted at `napari-steering-council@googlegroups.com`. For a list of the current
SC see our [About the project and team](team) page.

### Institutional and funding partners

The SC is the primary leadership body for napari. No outside institution,
individual or legal entity has the ability to own or control the project
other than by participating in napari as contributors, core team members, and
SC members. However, because institutions can be an important source of
funding and contributions for the project, it is important to formally
acknowledge institutional participation in the project. We call institutions
recognized in this way Institutional and Funding Partners (IFPs).

Institutions become eligible to become an IFP by employing individuals
who actively contribute to napari as part of their official
duties, or by committing significant funding to napari, as determined by the
SC. Once an institution becomes eligible to become an IFP, the SC must
nominate and approve the institution as an IFP. At that time one individual
from the IFP is expected to become the IFP Representative and serve on the
IFP Advisory Council. The role of the IFP Advisory Council is to provide
input on project directions and plans, and to elect one IFP Representative
to hold the IFP seat on the SC.

The IFP Advisory Council is expected to self-organize according to rules
agreed to by the existing IFPs. This document does not prescribe how IFPs
should elect their representative on the SC, though the IFP Advisory Council
should describe this process openly. IFPs are expected to work together
and with the napari community in good faith towards a common goal
of improving napari for the broader scientific computing community.

If at some point an existing IFP is no longer contributing any employees
or funding, then a one-year grace period commences. If during this one-year
period they do not contribute any employees or funding, then at the end of
the period their status as an IFP will lapse, and resuming it will require
going through the normal process for new IFPs. If the IFP Representative on
the SC is from an organization that loses its status as an Institutional Partner,
that person will cease being a member of the SC and the remaining IFP Advisory
Council members may choose a new Representative at their earliest convenience.

IFP benefits are:

- Acknowledgement on the napari website, including homepage, and in talks.
- Ability to acknowledge their contribution to napari on their own websites and in talks.
- Ability to provide input to the project through their Institutional Partner
  Representative.
- Ability to influence the project through the election of the Institutional
  and Funding Partner seat on the SC.

For a full list of current IFPs and their Representatives see our [About Us](team) page.

## Decision making process

Decisions about the future of the project are made through discussion with all
members of the community. All non-sensitive project management discussion takes
place on the [issue tracker](https://github.com/napari/napari/issues) and project
[zulip](https://napari.zulipchat.com/) community chat channel. Occasionally,
sensitive discussion may occur on a private core team member mailing list
`napari-core-devs@googlegroups.com` or private chat channel.

Decisions should be made in accordance with the [mission and values](mission-and-values)
of the napari project.

napari uses a “consensus seeking” process for making decisions. The group
tries to find a resolution that has no open objections among core team members.
Core team members are expected to distinguish between fundamental objections to a
proposal and minor perceived flaws that they can live with, and not hold up the
decision-making process for the latter. If no option can be found without
objections, the decision is escalated to the SC, which will itself use
consensus seeking to come to a resolution. In the unlikely event that there is
still a deadlock, the proposal will move forward if it has the support of a
simple majority of the SC.

Decisions (in addition to adding core team members and SC membership as above)
are made according to the following rules:

- **Minor documentation changes**, such as typo fixes, or addition / correction of a
  sentence, require approval by a core team member *and* no disagreement or requested
  changes by a core team member on the issue or pull request page (lazy
  consensus). Core team members are expected to give “reasonable time” to others
  to give their opinion on the pull request if they’re not confident others
  would agree.

- **Code changes and major documentation changes** require agreement by *one*
  core team member *and* no disagreement or requested changes by a core team member
  on the issue or pull-request page (lazy consensus). For all changes of this type,
  core team members are expected to give “reasonable time” after approval and before
  merging for others to weigh in on the pull request in its final state.

- **Changes to the API principles** require a dedicated issue on our
  [issue tracker](https://github.com/napari/napari/issues) and follow the
  decision-making process outlined above.

- **Changes to this governance model or our mission, vision, and values**
  require a dedicated issue on our [issue tracker](https://github.com/napari/napari/issues)
  and follow the decision-making process outlined above,
  *unless* there is unanimous agreement from core team members on the change in
  which case it can move forward faster.

If an objection is raised on a lazy consensus, the proposer can appeal to the
community and core team members and the change can be approved or rejected by
escalating to the SC.
