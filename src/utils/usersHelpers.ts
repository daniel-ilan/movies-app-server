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

export const deleteUserPermissionsById = (userId) => {
  const { allUsersPermissions, userIndex } = findUserPermissionsIndex(userId);

  if (userIndex > 0) {
    allUsersPermissions.splice(userIndex, 1);
  }

  fs.writeFileSync(
    relativePath('../Permissions.json'),
    JSON.stringify(allUsersPermissions),
  );
};

export const updateUserPermissions = (userId, permissions: string[]) => {
  const { allUsersPermissions, userIndex } = findUserPermissionsIndex(userId);

  allUsersPermissions[userIndex].permissions = permissions;
  fs.writeFileSync(
    relativePath('../Permissions.json'),
    JSON.stringify(allUsersPermissions),
  );
};

export const deleteUserFromJsonById = (userId) => {
  const { allUsers, userIndex } = findUserJsonIndex(userId);
  if (userIndex > 0) {
    allUsers.splice(userIndex, 1);
  }

  fs.writeFileSync(relativePath('../Users.json'), JSON.stringify(allUsers));
};

export const updateUserJson = (userId, userData) => {
  const { allUsers, userIndex } = findUserJsonIndex(userId);
  allUsers[userIndex] = { ...allUsers[userIndex], ...userData };
  fs.writeFileSync(relativePath('../Users.json'), JSON.stringify(allUsers));
};

export const findUserJsonByUsername = (username: string) => {
  const allUsers = findAllUsers();

  return allUsers.find((user) => {
    return user.username === username;
  });
};

const findUserJsonIndex = (userId) => {
  const allUsers = findAllUsers();
  const userIndex = allUsers.findIndex(
    (user) => user._id.toString() === userId,
  );
  return { allUsers, userIndex };
};

const findUserPermissionsIndex = (userId) => {
  const allUsersPermissions = findAllUsersPermissions();

  const userIndex = allUsersPermissions.findIndex(
    (user) => user._id.toString() === userId,
  );
  return { userIndex, allUsersPermissions };
};

export const findAllUsers = () => {
  const allUsers = JSON.parse(
    fs.readFileSync(relativePath('../Users.json'), 'utf8'),
  );
  return allUsers;
};

export const findAllUsersPermissions = () => {
  const allUsersPermissions = JSON.parse(
    fs.readFileSync(relativePath('../Permissions.json'), 'utf8'),
  );

  return allUsersPermissions;
};

export const getUserPermissionsById = (userId: string) => {
  const allUsersPermissions = findAllUsersPermissions();
  const permissions = allUsersPermissions.find(
    (permisssion) => permisssion._id === userId,
  );

  return permissions;
};
