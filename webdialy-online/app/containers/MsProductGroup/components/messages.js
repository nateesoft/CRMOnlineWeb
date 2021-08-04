/*
 * MsProductGroup Messages
 *
 * This contains all the text for the MsProductGroup container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MsProductGroup';

export default defineMessages({
  newItemHeader: {
    id: `${scope}.newItemHeader`,
    defaultMessage: 'New Group',
  },
  updateItemHeader: {
    id: `${scope}.updateItemHeader`,
    defaultMessage: 'Update old item',
  },
  headerContentPage: {
    id: `${scope}.headerContentPage`,
    defaultMessage: 'Content Page',
  },
  headerEditItem: {
    id: `${scope}.headerEditItem`,
    defaultMessage: 'Update product',
  },
  headerNewItem: {
    id: `${scope}.headerNewItem`,
    defaultMessage: 'New Item Form',
  },
  headerTableItems: {
    id: `${scope}.headerTableItems`,
    defaultMessage: 'Table List Items',
  },
  codeShouldNotEmpty: {
    id: `${scope}.codeShouldNotEmpty`,
    defaultMessage: 'Group code should not empty',
  },
  nameShouldNotEmpty: {
    id: `${scope}.nameShouldNotEmpty`,
    defaultMessage: 'Group name should not empty',
  },
  groupCode: {
    id: `${scope}.groupCode`,
    defaultMessage: 'Group Code',
  },
  groupName: {
    id: `${scope}.groupName`,
    defaultMessage: 'Group Name',
  },
  btnSave: {
    id: `${scope}.btnSave`,
    defaultMessage: 'Save',
  },
  btnReset: {
    id: `${scope}.btnReset`,
    defaultMessage: 'Reset',
  },
  btnBack: {
    id: `${scope}.btnBack`,
    defaultMessage: 'Back',
  },
});
