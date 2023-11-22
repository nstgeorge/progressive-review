import type { Schema, Attribute } from '@strapi/strapi';

export interface ReviewComponentsAlbumLink extends Schema.Component {
  collectionName: 'components_review_components_album_links';
  info: {
    displayName: 'albumLink';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
  };
}

export interface ReviewComponentsReviewCharacterizations
  extends Schema.Component {
  collectionName: 'components_review_components_review_characterizations';
  info: {
    displayName: 'ReviewCharacterizations';
    description: '';
  };
  attributes: {
    technicality: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    emotionality: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    polish: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    catchiness: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    musicality: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'review-components.album-link': ReviewComponentsAlbumLink;
      'review-components.review-characterizations': ReviewComponentsReviewCharacterizations;
    }
  }
}
