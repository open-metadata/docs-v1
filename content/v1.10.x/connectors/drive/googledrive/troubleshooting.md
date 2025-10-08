---
title: Google Drive Connector Troubleshooting
slug: /connectors/drive/googledrive/troubleshooting
---

# Troubleshooting

Learn how to resolve the most common problems people encounter when using the Google Drive connector.

## Common Issues

### Authentication Errors

**Problem**: Unable to authenticate with Google Drive API

**Solutions**:
1. Verify that the Google Drive API is enabled in your GCP project
2. Check that your service account has the correct permissions
3. Ensure the credentials JSON file is valid and properly formatted
4. If using domain-wide delegation, verify the Client ID and OAuth scopes are correctly configured in Google Workspace Admin Console

### Permission Denied Errors

**Problem**: "Permission denied" or "Access denied" errors during metadata extraction

**Solutions**:
1. Verify the service account has read access to the files and folders you're trying to ingest
2. If using shared drives, ensure the service account has been granted access to the specific shared drive
3. Check if the `delegatedEmail` (if configured) has the necessary permissions
4. Verify the following OAuth scopes are granted:
   - `https://www.googleapis.com/auth/drive.readonly`
   - `https://www.googleapis.com/auth/spreadsheets.readonly` (if using Google Sheets)

### No Files Detected

**Problem**: Ingestion completes successfully but no files are extracted

**Solutions**:
1. Check your filter patterns - they might be excluding all files
2. Verify that the `driveId` (if specified) is correct
3. Ensure `includeTeamDrives` is set to `true` if you want to include shared drives
4. Check that the service account has access to the drives you're trying to ingest

### Domain-Wide Delegation Issues

**Problem**: Domain-wide delegation not working

**Solutions**:
1. Verify the Client ID is correctly added to the Google Workspace Admin Console
2. Ensure the OAuth scopes are properly configured
3. Check that the `delegatedEmail` specified in the connection configuration is correct
4. Verify that the service account has domain-wide delegation enabled

### Google Sheets Not Extracted

**Problem**: Google Sheets files are not being ingested

**Solutions**:
1. Set `includeGoogleSheets` to `true` in your configuration
2. Verify the Google Sheets API is enabled in your GCP project
3. Check that the OAuth scope `https://www.googleapis.com/auth/spreadsheets.readonly` is granted

## Getting Help

If you continue to experience issues:

1. Check the [OpenMetadata Slack](https://slack.open-metadata.org/) community
2. Review the [GitHub Issues](https://github.com/open-metadata/OpenMetadata/issues) for similar problems
3. Consult the [Google Drive API documentation](https://developers.google.com/drive/api/guides/about-sdk)
4. Open a new issue on [GitHub](https://github.com/open-metadata/OpenMetadata/issues/new/choose) with detailed logs and error messages
