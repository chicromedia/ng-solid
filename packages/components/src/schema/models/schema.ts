import { Event } from "../interfaces/event";
import { NsSchemaType } from "../enums/schema-type.enum";

export interface NsSchemaMarkup
{
  "@type": NsSchemaType,
  "@id"?: string;
  name: string;
  description: string;
  url: string;
  image?: string;
  logo?: string;
  email?: string;
  inLanguage?: string;
  founder?: {
    "@type": "Person";
    name: string;
    gender?: string;
    jobTitle: string;
    image: string;
    sameAs?: string[]
  },
  inAlbum?: {
    "@type": 'MusicAlbum',
    name: string;
    url: string;
    image: string;
  }
  foundingDate?: string;
  contactPoint?: [
    {
      "@type": "ContactPoint";
      contactType: string;
      email: string;
      url: string;
    }
  ],
  sameAs?: string[];
  event?: Event[];
  producer?: {
    "@type": 'Person',
    name: string
  };
  numTracks?: number;
  byArtist?: {
    "@type": "MusicGroup";
    name: string;
    url: string;
  }
  duration?: string;
  recordingOf?: {
    "@type": 'MusicComposition';
    name: string,
    iswsCode: string;
  },
  potentialAction?: [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": string
      },
      "query-input": string
    }
  ],
  track?: {
    "@type": "ItemList";
    numberOfItems: number;
    itemListElement: {
      "@type": "ListItem";
      position: number;
      item: {
        "@type": "MusicRecording";
        name: string;
        url: string;
        duration: string;
      }
    }[]
  }
}
