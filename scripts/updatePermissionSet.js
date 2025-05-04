// scripts/updatePermissionSet.js
const fs = require("fs");
const xml2js = require("xml2js");

const designDir = "design/permissionSet";
const permissionSetDir = "force-app/main/default/permissionsets";

async function updatePermissionSet() {
  try {
    // 1. Read the objectSetting.md file
    const permissionSetFiles = fs
      .readdirSync(permissionSetDir)
      .filter((file) => file.endsWith(".permissionset-meta.xml"));
    if (permissionSetFiles.length === 0) {
      console.log("No permission set files found.");
      return;
    }

    const permissionSetFile = permissionSetFiles[0];
    const permissionSetName = permissionSetFile.replace(
      ".permissionset-meta.xml",
      ""
    );
    const objectSettingPath = `${designDir}/${permissionSetName}/objectSetting.md`;

    const markdownData = fs.readFileSync(objectSettingPath, "utf-8");

    // 2. Parse the markdown data
    const lines = markdownData.split("\n");
    const objectPermissions = [];

    // Skip the header lines
    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Ignore the separator lines
      if (line.startsWith("|---|")) continue;

      const columns = line
        .split("|")
        .map((col) => col.trim())
        .slice(1, -1);
      if (columns.length !== 8) continue;

      const [
        objectName,
        allowCreate,
        allowRead,
        allowEdit,
        allowDelete,
        viewAllRecords,
        modifyAllRecords,
        viewAllFields
      ] = columns;

      objectPermissions.push({
        object: objectName,
        allowCreate: allowCreate === "true",
        allowRead: allowRead === "true",
        allowEdit: allowEdit === "true",
        allowDelete: allowDelete === "true",
        viewAllRecords: viewAllRecords === "true",
        modifyAllRecords: modifyAllRecords === "true",
        viewAllFields: viewAllFields === "true"
      });
    }

    // 3. Read the PermissionSet XML file
    const permissionSetPath = `${permissionSetDir}/${permissionSetFile}`;
    const xmlData = fs.readFileSync(permissionSetPath, "utf-8");

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);
    const permissionSet = result.PermissionSet;

    // 4. Update the objectPermissions in the XML data
    permissionSet.objectPermissions = [];

    objectPermissions.forEach((permission) => {
      const objectPermission = {
        allowCreate: [permission.allowCreate.toString()],
        allowDelete: [permission.allowDelete.toString()],
        allowEdit: [permission.allowEdit.toString()],
        allowRead: [permission.allowRead.toString()],
        modifyAllRecords: [permission.modifyAllRecords.toString()],
        object: [permission.object],
        viewAllFields: [permission.viewAllFields.toString()],
        viewAllRecords: [permission.viewAllRecords.toString()]
      };
      permissionSet.objectPermissions.push(objectPermission);
    });

    // 5. Convert the JSON back to XML
    const builder = new xml2js.Builder();
    const updatedXml = builder.buildObject(result);

    // 6. Write the updated XML back to the file
    fs.writeFileSync(permissionSetPath, updatedXml);

    console.log(`Permission set ${permissionSetName} updated successfully.`);
  } catch (error) {
    console.error("Error updating permission set:", error);
  }
}

updatePermissionSet();
