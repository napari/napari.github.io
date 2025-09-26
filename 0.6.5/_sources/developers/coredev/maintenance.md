(napari-maintenance)=

# Maintenance

This document describes maintenance tasks that need to be performed from time to time. Its purpose is to avoid relying on personal memory alone, and it should be updated regularly.

## Refreshing tokens for the auto upgrade of test constraints and vendored packages.

Because of the security GitHub policy, the commits and pull requests created by an action that uses default `GITHUB_TOKEN`
will not trigger another action's runs. The possible workaround for this is to close and then reopen the pull request.
But this requires additional actions by core devs.

To get automatically running workflows, we need to create a personal access token (PAT) and add it to the repository secrets.
For security reasons, it is recommended to create a [fine-grained token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). It allows us to provide only the required permissions.

The token should have a one-year expiration date. After that, it needs to be refreshed.

The token should be named `GHA_TOKEN` and the required permissions are:

 * **read** to repository metadata
 * **read and write** to pull requests
 * **read and write** to code

 ![screenshot of token permissions in GitHub UI](../../_static/images/update_token_permissions.png)

 At the moment of writing this document, there is a difference in names between the summary of the token and the list of permissions.
 The **code** permission is called **Contents** in the Edit view of the token.

![screenshot of token permissions](../../_static/images/edit_token_permissions.png)

## Refreshing the token

To create a new token, go to the personal settings page and select _Developer settings_ at the bottom of the left menu. On the visible screen, expand the _Personal access tokens_ section and click the _Fine-grained token_ link.

![View on list of fine-grained tokens](../../_static/images/fine_grained_token.png)

Then click the _Generate new token_ button in the upper right corner.

Fill the form:

1. Choose a name for the token. This is only for you to better remember what
   the token is. The name will not be used by any workflows or in any other
   step.
2. Set expiration to custom and then select one year after the current date.
3. Optionally set a description. Again this is only for your own memory. A link
   to this page might be appropriate.
4. Select **napari** to be the resource owner
5. Select _Only selected repositories_ and then select **napari/napari** repository

![screenshot of the token creation form](../../_static/images/token_permission_form.png)

6. Select the required permissions for repository metadata, pull requests, and code (contents)

![screenshot of the token creation form](../../_static/images/token_permission_selection.png)

7. Click the _Generate token_ button
8. Copy token
9. Go to the napari repository settings
10. Expand the _Secrets and variables_ section and select _Actions_
11. Click the edit button for the `GHA_TOKEN` secret

![screenshot of the token creation form](../../_static/images/secrets_section.png)

12. Paste a new token to the value field

To validate if the token is working, you can run the "Upgrade test constraints" workflow manually. Ensure that there will be some packages to update.

## Update translation strings

Currently, translations are unmaintained, but this may change in the future as napari matures.

As new code is included in the codebase, some of the strings that need to be translated might
not yet be using the `trans` methods. To help keep the codebase up to date in terms
of translations we added a test script that
[runs daily on CI](https://github.com/napari/napari/actions/workflows/test_translations.yml)
and can be also run locally to ensure that a release includes the most up to date translatable
strings.

The test script is available on the `/tools/validate_strings.py` file and it relies on an additional
file `/tools/strings_list.py` to include strings to skip safely from translation.

The test checks:

  1. **Untranslated strings**: not using the `trans` methods.
  2. **Outdated skip strings**: should no longer be included in the `/tools/strings_list.py` file.
  3. **Translation usage errors**: where translation strings may be missing interpolation variables.

You can execute tests locally from the repository root, and follow the instructions printed
on the `stdout` if any test fails.

  ```bash
  pytest tools/ --tb=short
  ```