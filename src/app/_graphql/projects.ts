import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { META } from './meta'

export const PROJECTS = `
  query Projects {
    Projects(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PROJECT = `
  query Project($slug: String, $draft: Boolean) {
    Projects(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        categories {
          title
        }
        createdAt
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }

        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        relatedProjects {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`
