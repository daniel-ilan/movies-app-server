import * as fs from 'fs';
import * as path from 'path';

export const relativePath = (fileName: string) => {
  return path.join(__dirname, fileName);
};

export const saveUserToJson = (userJsonData) => {
  const allUsers = JSON.parse(
    fs.readFileSync(relativePath('../Users.json'), 'utf8'),
  );

  allUsers.push(userJsonData);
  fs.writeFileSync(relativePath('../Users.json'), JSON.stringify(allUsers));
};

export const saveUserPermissions = (userPermissionsData) => {
  const allUsersPermissions = JSON.parse(
    fs.readFileSync(relativePath('../Permissions.json'), 'utf8'),
  );

  allUsersPermissions.push(userPermissionsData);
  fs.writeFileSync(
    relativePath('../Permissions.json'),
    JSON.stringify(allUsersPermissions),
  );
};

export const findUserByUsername = (username: string) => {
  const allUsers = JSON.parse(
    fs.readFileSync(relativePath('../Users.json'), 'utf8'),
  );

  return allUsers.find((user) => {
    return user.username === username;
  });
};
