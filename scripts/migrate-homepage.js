module.exports = function (migration) {
  const homepage = migration.createContentType('homepage')
    .name('Homepage')
    .displayField('internalTitle')
    .description('Content for the Homepage');

  homepage.createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  // Hero Section
  homepage.createField('heroBadgeOverline').name('Hero Badge Overline').type('Symbol');
  homepage.createField('heroBadgeCategory').name('Hero Badge Category').type('Symbol');
  homepage.createField('heroHeadline').name('Hero Headline').type('Symbol');
  homepage.createField('heroHighlightedPhrase').name('Hero Highlighted Phrase').type('Symbol');
  homepage.createField('heroSubtitle').name('Hero Subtitle').type('Text');
  homepage.createField('heroKeyValues').name('Hero Key Values').type('Array').items({ type: 'Symbol' });
  homepage.createField('heroCtaPrimaryText').name('Hero CTA Primary Text').type('Symbol');
  homepage.createField('heroCtaSecondaryText').name('Hero CTA Secondary Text').type('Symbol');
  homepage.createField('heroComplianceNotice').name('Hero Compliance Notice').type('Symbol');
  homepage.createField('heroPartnerName').name('Hero Partner Name').type('Symbol');
  homepage.createField('heroPartnerTitle').name('Hero Partner Title').type('Symbol');
  homepage.createField('heroPartnerBio').name('Hero Partner Bio').type('Text');
  homepage.createField('heroMetricPlacements').name('Hero Metric Placements').type('Symbol');
  homepage.createField('heroMetricTenure').name('Hero Metric Tenure').type('Symbol');
  homepage.createField('heroMetricRetention').name('Hero Metric Retention').type('Symbol');
  homepage.createField('heroMetricCoverage').name('Hero Metric Coverage').type('Symbol');

  // Sector Matrix Section
  homepage.createField('sectorMatrixSectionLabel').name('Sector Matrix Section Label').type('Symbol');
  homepage.createField('sectorMatrixTitle').name('Sector Matrix Title').type('Symbol');
  homepage.createField('sectorMatrixDescription').name('Sector Matrix Description').type('Text');
  homepage.createField('sectorMatrixSubDisciplines').name('Sector Matrix Sub Disciplines').type('Array').items({ type: 'Symbol' });

  // Difference Section
  homepage.createField('differenceSectionLabel').name('Difference Section Label').type('Symbol');
  homepage.createField('differenceTitle').name('Difference Title').type('Symbol');
  homepage.createField('differenceDescription').name('Difference Description').type('Text');
  homepage.createField('differenceAssuranceTitle').name('Difference Assurance Title').type('Symbol');
  homepage.createField('differenceAssuranceDescription').name('Difference Assurance Description').type('Text');
  homepage.createField('differenceCandidateQualityTitle').name('Difference Candidate Quality Title').type('Symbol');
  homepage.createField('differenceCandidateQualityText').name('Difference Candidate Quality Text').type('Text');
  homepage.createField('differenceReplacementGuaranteeTitle').name('Difference Replacement Guarantee Title').type('Symbol');
  homepage.createField('differenceReplacementGuaranteeText').name('Difference Replacement Guarantee Text').type('Text');

  // Process Section
  homepage.createField('processSectionLabel').name('Process Section Label').type('Symbol');
  homepage.createField('processTitle').name('Process Title').type('Symbol');
  homepage.createField('processDescription').name('Process Description').type('Text');

  // Insights Section
  homepage.createField('insightsSectionLabel').name('Insights Section Label').type('Symbol');
  homepage.createField('insightsTitle').name('Insights Title').type('Symbol');
  homepage.createField('insightsDescription').name('Insights Description').type('Text');
  homepage.createField('insightsReportBannerCategory').name('Insights Report Banner Category').type('Symbol');
  homepage.createField('insightsReportBannerTitle').name('Insights Report Banner Title').type('Symbol');
  homepage.createField('insightsReportBannerDescription').name('Insights Report Banner Description').type('Text');
  homepage.createField('insightsReportBannerCtaText').name('Insights Report Banner CTA Text').type('Symbol');

  // About Partner Section
  homepage.createField('aboutPartnerSectionLabel').name('About Partner Section Label').type('Symbol');
  homepage.createField('aboutPartnerBadge').name('About Partner Badge').type('Symbol');
  homepage.createField('aboutPartnerBadgeSecondary').name('About Partner Badge Secondary').type('Symbol');
  homepage.createField('aboutPartnerHeadline').name('About Partner Headline').type('Symbol');
  homepage.createField('aboutPartnerPartnerName').name('About Partner Partner Name').type('Symbol');
  homepage.createField('aboutPartnerPartnerRole').name('About Partner Partner Role').type('Symbol');
  homepage.createField('aboutPartnerPartnerPracticeTenure').name('About Partner Practice Tenure').type('Symbol');
  homepage.createField('aboutPartnerPartnerSpecialization').name('About Partner Specialization').type('Symbol');
  homepage.createField('aboutPartnerPartnerPlacementLevel').name('About Partner Placement Level').type('Symbol');
  homepage.createField('aboutPartnerPartnerEmail').name('About Partner Email').type('Symbol');
  homepage.createField('aboutPartnerPartnerLinkedinUrl').name('About Partner LinkedIn URL').type('Symbol');
  homepage.createField('aboutPartnerParagraphs').name('About Partner Paragraphs').type('Array').items({ type: 'Symbol' }); // Using Symbol array for simple paragraphs or Text array if supported, but typically text arrays are tricky in some UI. 'Array of Symbols' is standard. If they need rich text, it should be RichText, but since the interface uses `string[]`, Array of Symbols is closest.
  homepage.createField('aboutPartnerCredentialsChecklist').name('About Partner Credentials Checklist').type('Array').items({ type: 'Symbol' });

  // Contact Footer Section
  homepage.createField('contactFooterBannerOverline').name('Contact Footer Banner Overline').type('Symbol');
  homepage.createField('contactFooterBannerTitle').name('Contact Footer Banner Title').type('Symbol');
  homepage.createField('contactFooterBannerSubtitle').name('Contact Footer Banner Subtitle').type('Text');
  homepage.createField('contactFooterBannerCtaText').name('Contact Footer Banner CTA Text').type('Symbol');
  homepage.createField('contactFooterNdaTitle').name('Contact Footer NDA Title').type('Symbol');
  homepage.createField('contactFooterNdaStatement').name('Contact Footer NDA Statement').type('Text');
  homepage.createField('contactFooterSiteDescription').name('Contact Footer Site Description').type('Text');
  homepage.createField('contactFooterResponseGuarantee').name('Contact Footer Response Guarantee').type('Symbol');
};
