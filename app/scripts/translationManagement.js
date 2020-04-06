// eslint-disable-next-line import/no-extraneous-dependencies
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'lang/.messages',
  translationsDirectory: 'lang/',
  languages: ['en', 'sv'], // any language you need
  singleMessagesFile: false,
});
