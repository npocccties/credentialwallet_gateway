import { rest } from "msw";

import { mockBadgeMetaData, url } from "./api/moodle/metadata";

export const handlers = [rest.get(url, mockBadgeMetaData)];
