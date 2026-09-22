(security-policy)=

# Organization security policy

This page documents the security practices for the
[napari GitHub organization](https://github.com/napari), including
who has Owner permissions on the organization, how those permissions
are granted and reviewed, and the process for requesting temporary
elevated access.

(org-owners)=

## GitHub organization owners

GitHub organization owners have elevated permissions over the entire
napari GitHub organization, including the ability to manage repositories,
teams, and settings across all projects in the organization. Because
these permissions carry security risk, ownership is limited
to a small number of trusted individuals rather than granted broadly.

### Criteria

Owners should meet the following criteria:

- Regularly work with infrastructure and/or repositories across the
  napari organization.
- Have enough availability on the project to be generally responsive
  to security and administrative requests.
- Be geographically distributed to provide timezone coverage.
- Be willing to take on the responsibilities of the owner role,
  including responding promptly to urgent security issues.

### Authentication and review

Request to become an owner are made via the private `#auth-security` Zulip channel
and are reviewed by the current owners and the Steering Council.

Ownership designations are reviewed annually, typically at the same time
as the [core team reaffirmation](napari-governance) process (reviewed every
January). The Steering Council and Core Team reviews the current list of owners
and confirms or adjusts it based on current needs and the criteria above.
If an owner is no longer regularly active in the organization, or no
longer meets the criteria, they may be removed from the owner role.

(temporary-access)=

## Requesting temporary owner access

Sometimes a task requires temporary owner-level permissions — for
example, to manage a critical repository migration, handle a security
incident, or perform bulk administrative actions. A process exists
for requesting and granting temporary owner access.

### How to request

Requests for temporary owner access or other elevated permissions should be made
in the private `#auth-security` channel on the [napari Zulip](https://napari.zulipchat.com).
Requests should include:

- **Who** is requesting the access.
- **Why** the access is needed (what task requires elevated permissions).
- **Duration** — how long the access is needed (e.g., "for the next
  48 hours", "until the repository migration is complete").
- **Scope** — what specific actions the access will be used for.

### Approval

Requests are reviewed by the designated owners and/or the
[Steering Council](napari-governance). Temporary owner access is
granted by any of the current owners. The request and its
resolution should be recorded in the Zulip thread for
accountability and future reference.

### Revocation

Temporary owner permissions are revoked once the stated duration has
elapsed or the task is complete, whichever comes first. It is the
responsibility of the individual who requested the access to notify
the owners when the task is complete so that permissions can be
removed promptly. The designated owners may also revoke temporary
access at any time if they deem it no longer necessary.

## Roles and permissions overview

| Role | GitHub permissions | Default holders |
|---|---|---|
| **Organization owner** | Full administrative access to the organization and all its repositories | Four designated owners |
| **Admin** | Repository-level admin, team management | Core team members on repositories they maintain |
| **Write** | Push access, PR management | Core team members |
| **Read** | Read-only access | All organization members |

For questions about organization security, contact the
[Steering Council](napari-governance) at
`napari-steering-council@googlegroups.com`.
