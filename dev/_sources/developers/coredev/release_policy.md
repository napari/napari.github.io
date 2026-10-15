(napari-release)=

# Release policy

This page describes how `napari` releases are planned, coordinated, and
communicated. It is the entry point for understanding the release process —
the [release guide](napari-release-guide) contains the step-by-step mechanics
for executing a release. Most required tools mentioned here are in
[napari/napari-release-tools](https://github.com/napari/napari-release-tools).
The release manager is is responsible for organizing, executing, and
communicating with the team and community about the release process, as
described in the [release guide](napari-release-guide).

## EffVer: (Intended) Effort Versioning

As of 0.6.5, napari has officially adopted [EffVer](https://effver.org) for
versioning, from the previous semantic versioning. While in pre-1.0 state, the
current convention is `0.MACRO.MESO` and once we release v1.0.0 will henceforth
be in `MACRO.MESO.MICRO` versioning. This is similar to previous Semantic
Versioning schema of `MAJOR.MINOR.BUGFIX`, but allows features and bugfixes to
live harmoniously in any version. Instead, the version number implies to users
the amount of effort required to adopt the newest version from significant
effort (`MACRO`) to no expected effort (`MICRO`). Our current policy permits
deprecations in `MACRO` and `MESO` releases only.

## Release cadence

napari ships on a monthly cadence. Releases are declared meso (e.g. `0.9.0` ->
`0.9.1`) or macro (e.g. `0.9.9` -> `0.10.0`) *after the fact*: we do not
pre-plan whether the next release will be "big" or "small", so contributions
merge when they are ready rather than being rushed into a particular release.

The monthly cycle is:

- **alpha** around the 10th of the month — validates that the whole release
  process works;
- **release candidate** (rc) around the 15th;
- **final release** around the 21st.

We will not ship a release between December 10 and January 10, except in the
case of large regressions. We may declare a special release (for example, one
following a large community event) from the start, explicitly outside the
expected calendar, when there is clear value in doing so. Such releases may
take longer to prepare, and this should be communicated clearly.

A feature or enhancement that is not ready for an upcoming release is **not** a
reason to delay it. With a monthly cadence, it simply ships a month later.

### What can merge when

- **Features and enhancements** should be ready before the first release
  candidate (rc1).
- **Documentation, bug fixes, and maintenance** may be merged during the rc
  phase.

## Milestones

Milestones are not required to be added to pull requests prior to merge. The
upcoming milestone is automatically added to a PR upon merge. However,
milestones can be added to a PR to indicate that the PR is either required
for the next release or that a team member is taking ownership of the PR
to ensure that it is ready for the next release. Finally, future milestones,
such as the one corresponding to the next `MACRO` release, can be added to a PR
to indicate that it should not be merged *unless* the current release is
determined to be of the appropriate version.

### Milestone ownership

Whoever adds a milestone to a pull request takes responsibility for driving
that pull request to a mergeable point — even by pushing the required changes
to the PR. This person is also responsible for communicating with the release
manager about the state of the PR after the first alpha.

### Demilestoning

About a week before the planned rc1, the release manager goes through the
milestoned pull requests and checks how ready they look. If they have concerns
about a PR, they write a message in the
[release channel](https://napari.zulipchat.com/#narrow/stream/215289-release),
tagging the team member who added the milestone, to get feedback. After three
days, if there is no response or significant progress, the release manager may
remove the milestone with a message like "This PR does not look to be ready for
the upcoming release and is having the milestone removed."

An incomplete feature or enhancement should not delay a release. The exception
is a PR that is pending only on review, when the reviewer declares they will do
it in a few days.

Removing a milestone from a pull request that will not be ready is nothing
personal: it is simply a matter of the calendar, and of making sure already
merged contributions are released in a timely manner so people can start using
them. It is sometimes better to deliver later without haste, than to rush and
make mistakes.

The PR can be re-milestoned for the next release when it is ready.

## Highlights

Adding the `highlight` label to a pull request carries a responsibility: the
person who adds it (or someone they recruit, such as the owner of the PR)
should provide the motivation for highlighting, plus a draft
of the highlight note and any required images or videos. This becomes the basis
for preparing the highlight text for the release — without it, the release
manager might need to review already-reviewed, approved, and merged PRs.
