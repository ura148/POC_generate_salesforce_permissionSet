// scripts/generateObjectSettingDoc.js
const fs = require("fs");
const xml2js = require("xml2js");

const permissionSetDir = "force-app/main/default/permissionsets";
const manifestFile = "manifest/package.xml";
const designDir = "design/permissionSet";

async function generateObjectSettingDoc() {
  try {
    // 1. Read Permission Set XML file
    const permissionSetFiles = fs
      .readdirSync(permissionSetDir)
      .filter((file) => file.endsWith(".permissionset-meta.xml"));
    if (permissionSetFiles.length === 0) {
      console.log("No permission set files found.");
      return;
    }

    // For now, just process the first permission set file
    const permissionSetFile = permissionSetFiles[0];
    const permissionSetName = permissionSetFile.replace(
      ".permissionset-meta.xml",
      ""
    );
    const permissionSetPath = `${permissionSetDir}/${permissionSetFile}`;
    const xmlData = fs.readFileSync(permissionSetPath, "utf-8");

    // 2. Read manifest file for custom objects
    const manifestData = fs.readFileSync(manifestFile, "utf-8");

    const parser = new xml2js.Parser();
    const manifestJson = await parser.parseStringPromise(manifestData);

    const customObjects =
      manifestJson.Package.types.find((type) => type.name[0] === "CustomObject")
        ?.members || [];

    // 3. Parse XML to JSON
    const result = await parser.parseStringPromise(xmlData);
    const permissionSet = result.PermissionSet;

    // 4. Extract object permissions
    const objectPermissions = permissionSet.objectPermissions || [];

    // 5. Create the object to store the permissions
    const objectPermissionsMap = {};
    objectPermissions.forEach((permission) => {
      objectPermissionsMap[permission.object[0]] = {
        allowCreate: permission.allowCreate
          ? permission.allowCreate[0] === "true"
          : false,
        allowRead: permission.allowRead
          ? permission.allowRead[0] === "true"
          : false,
        allowEdit: permission.allowEdit
          ? permission.allowEdit[0] === "true"
          : false,
        allowDelete: permission.allowDelete
          ? permission.allowDelete[0] === "true"
          : false,
        viewAllRecords: permission.viewAllRecords
          ? permission.viewAllRecords[0] === "true"
          : false,
        modifyAllRecords: permission.modifyAllRecords
          ? permission.modifyAllRecords[0] === "true"
          : false,
        viewAllFields: permission.viewAllFields
          ? permission.viewAllFields[0] === "true"
          : false
      };
    });

    // Add custom objects from manifest that are not in the permission set
    customObjects.forEach((object) => {
      if (!objectPermissionsMap[object]) {
        objectPermissionsMap[object] = {
          allowCreate: false,
          allowRead: false,
          allowEdit: false,
          allowDelete: false,
          viewAllRecords: false,
          modifyAllRecords: false,
          viewAllFields: false
        };
      }
    });

    // 6. Generate Markdown content
    let markdownContent = `# Object Permissions for ${permissionSetName}\n\n`;
    markdownContent +=
      "| Object | Create | Read | Edit | Delete | View All | Modify All | View All Fields |\n";
    markdownContent += "|---|---|---|---|---|---|---|---|\n";

    for (const object in objectPermissionsMap) {
      const permissions = objectPermissionsMap[object];
      markdownContent += `| ${object} | ${permissions.allowCreate} | ${permissions.allowRead} | ${permissions.allowEdit} | ${permissions.allowDelete} | ${permissions.viewAllRecords} | ${permissions.modifyAllRecords} | ${permissions.viewAllFields} |\n`;
    }

    // 7. Create the directory if it doesn't exist
    const permissionSetDesignDir = `${designDir}/${permissionSetName}`;
    if (!fs.existsSync(permissionSetDesignDir)) {
      fs.mkdirSync(permissionSetDesignDir, { recursive: true });
    }

    // 8. Write to file
    const filePath = `${permissionSetDesignDir}/objectSetting.md`;
    fs.writeFileSync(filePath, markdownContent);

    console.log(
      `Object setting documentation generated successfully at ${filePath}`
    );
  } catch (error) {
    console.error("Error generating object setting documentation:", error);
  }
}

generateObjectSettingDoc();
