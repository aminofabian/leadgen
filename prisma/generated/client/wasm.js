
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  password: 'password',
  role: 'role',
  isTwoFactorEnabled: 'isTwoFactorEnabled',
  username: 'username',
  bio: 'bio',
  location: 'location',
  website: 'website',
  twitter: 'twitter',
  facebook: 'facebook',
  instagram: 'instagram',
  linkedin: 'linkedin',
  youtube: 'youtube',
  github: 'github',
  discord: 'discord',
  tiktok: 'tiktok',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.IntegrationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  token: 'token',
  expiresAt: 'expiresAt',
  username: 'username',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  priceId: 'priceId',
  customerId: 'customerId',
  stripeSubscriptionId: 'stripeSubscriptionId',
  currentPeriodStart: 'currentPeriodStart',
  currentPeriodEnd: 'currentPeriodEnd',
  cancelAtPeriodEnd: 'cancelAtPeriodEnd',
  canceledAt: 'canceledAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  features: 'features',
  metadata: 'metadata'
};

exports.Prisma.SubscriptionPlanScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  priceId: 'priceId',
  price: 'price',
  interval: 'interval',
  features: 'features',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AutomationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  integrationId: 'integrationId',
  type: 'type',
  status: 'status',
  config: 'config',
  stats: 'stats',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastRunAt: 'lastRunAt',
  nextRunAt: 'nextRunAt'
};

exports.Prisma.AutomationTaskScalarFieldEnum = {
  id: 'id',
  automationId: 'automationId',
  status: 'status',
  result: 'result',
  error: 'error',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  startedAt: 'startedAt',
  completedAt: 'completedAt'
};

exports.Prisma.HashtagScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  postsCount: 'postsCount',
  avgLikes: 'avgLikes',
  avgComments: 'avgComments',
  searchedAt: 'searchedAt',
  hashtagSearchId: 'hashtagSearchId'
};

exports.Prisma.HashtagRelationScalarFieldEnum = {
  id: 'id',
  hashtagId: 'hashtagId',
  relatedHashtagId: 'relatedHashtagId',
  createdAt: 'createdAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  hashtagId: 'hashtagId',
  postId: 'postId',
  caption: 'caption',
  likeCount: 'likeCount',
  commentCount: 'commentCount',
  postedAt: 'postedAt',
  createdAt: 'createdAt'
};

exports.Prisma.HashtagSearchScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  query: 'query',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HashtagsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  imageUrl: 'imageUrl',
  businessDescription: 'businessDescription',
  targetAudience: 'targetAudience',
  searchedAt: 'searchedAt'
};

exports.Prisma.RelatedHashtagsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  posts: 'posts',
  hashtagId: 'hashtagId'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.TwoFactorConfirmationScalarFieldEnum = {
  id: 'id',
  userId: 'userId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  VERIFIED_USER: 'VERIFIED_USER'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
  INCOMPLETE: 'INCOMPLETE',
  INCOMPLETE_EXPIRED: 'INCOMPLETE_EXPIRED',
  TRIALING: 'TRIALING',
  UNPAID: 'UNPAID',
  PAUSED: 'PAUSED',
  INACTIVE: 'INACTIVE',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  VerificationToken: 'VerificationToken',
  PasswordResetToken: 'PasswordResetToken',
  Integration: 'Integration',
  Subscription: 'Subscription',
  SubscriptionPlan: 'SubscriptionPlan',
  Automation: 'Automation',
  AutomationTask: 'AutomationTask',
  Hashtag: 'Hashtag',
  HashtagRelation: 'HashtagRelation',
  Post: 'Post',
  HashtagSearch: 'HashtagSearch',
  Hashtags: 'Hashtags',
  RelatedHashtags: 'RelatedHashtags',
  Session: 'Session',
  TwoFactorConfirmation: 'TwoFactorConfirmation'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\New folder\\ig-lead-gen\\prisma\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "D:\\New folder\\ig-lead-gen\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.1.0",
  "engineVersion": "11f085a2012c0f4778414c8db2651556ee0ef959",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"./generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\nenum UserRole {\n  USER\n  ADMIN\n  VERIFIED_USER\n}\n\nenum SubscriptionStatus {\n  ACTIVE\n  PAST_DUE\n  CANCELED\n  INCOMPLETE\n  INCOMPLETE_EXPIRED\n  TRIALING\n  UNPAID\n  PAUSED\n  INACTIVE\n  CANCELLED\n}\n\nmodel User {\n  id                 String    @id @default(cuid())\n  firstName          String?\n  lastName           String?\n  email              String?   @unique\n  emailVerified      DateTime?\n  image              String?\n  password           String?\n  role               UserRole  @default(USER)\n  isTwoFactorEnabled Boolean   @default(false)\n\n  // Keep existing social fields\n  username  String?\n  bio       String?\n  location  String?\n  website   String?\n  twitter   String?\n  facebook  String?\n  instagram String?\n  linkedin  String?\n  youtube   String?\n  github    String?\n  discord   String?\n  tiktok    String?\n\n  // Relations\n  accounts        Account[]\n  sessions        Session[]\n  subscription    Subscription?\n  integrations    Integration[]\n  automations     Automation[]\n  hashtags        Hashtag[]\n  hashtagSearches HashtagSearch[]\n\n  createdAt             DateTime               @default(now())\n  updatedAt             DateTime               @updatedAt\n  twoFactorConfirmation TwoFactorConfirmation?\n}\n\nmodel Account {\n  id                String  @id @default(cuid())\n  userId            String  @map(\"user_id\")\n  type              String\n  provider          String\n  providerAccountId String  @map(\"provider_account_id\")\n  refresh_token     String? @db.Text\n  access_token      String? @db.Text\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String? @db.Text\n  session_state     String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n  @@map(\"accounts\")\n}\n\nmodel VerificationToken {\n  id        String   @id @default(cuid())\n  email     String\n  token     String   @unique\n  expires   DateTime\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([email, token])\n}\n\nmodel PasswordResetToken {\n  id      String   @id @default(cuid())\n  email   String\n  token   String   @unique\n  expires DateTime\n\n  @@unique([email, token])\n}\n\nmodel Integration {\n  id          String       @id @default(cuid())\n  userId      String\n  name        String // e.g., \"instagram\", \"reddit\", \"twitter\"\n  token       String\n  expiresAt   DateTime?\n  username    String?\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)\n  automations Automation[]\n\n  @@unique([userId, name])\n  @@map(\"integrations\")\n}\n\nmodel Subscription {\n  id                   String             @id @default(cuid())\n  userId               String             @unique\n  status               SubscriptionStatus\n  priceId              String\n  customerId           String?\n  stripeSubscriptionId String?\n  currentPeriodStart   DateTime\n  currentPeriodEnd     DateTime\n  cancelAtPeriodEnd    Boolean            @default(false)\n  canceledAt           DateTime?\n  createdAt            DateTime           @default(now())\n  updatedAt            DateTime           @updatedAt\n  features             Json // Store enabled features for this subscription\n  metadata             Json? // Additional subscription metadata\n  user                 User               @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"subscriptions\")\n}\n\nmodel SubscriptionPlan {\n  id          String   @id @default(cuid())\n  name        String\n  description String?\n  priceId     String   @unique\n  price       Float\n  interval    String // monthly, yearly\n  features    String[]\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map(\"subscription_plans\")\n}\n\nmodel Automation {\n  id            String           @id @default(cuid())\n  userId        String\n  integrationId String\n  type          String // dm, post, comment, etc.\n  status        String // active, paused, completed, failed\n  config        Json // Flexible configuration for different automation types\n  stats         Json? // Statistics and metrics\n  createdAt     DateTime         @default(now())\n  updatedAt     DateTime         @updatedAt\n  lastRunAt     DateTime?\n  nextRunAt     DateTime?\n  user          User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  integration   Integration      @relation(fields: [integrationId], references: [id], onDelete: Cascade)\n  tasks         AutomationTask[]\n\n  @@map(\"automations\")\n}\n\nmodel AutomationTask {\n  id           String     @id @default(cuid())\n  automationId String\n  status       String // pending, running, completed, failed\n  result       Json? // Task result data\n  error        String? // Error message if failed\n  createdAt    DateTime   @default(now())\n  updatedAt    DateTime   @updatedAt\n  startedAt    DateTime?\n  completedAt  DateTime?\n  automation   Automation @relation(fields: [automationId], references: [id], onDelete: Cascade)\n\n  @@map(\"automation_tasks\")\n}\n\nmodel Hashtag {\n  id                String            @id @default(cuid())\n  userId            String\n  name              String\n  postsCount        Int               @default(0)\n  avgLikes          Float             @default(0)\n  avgComments       Float             @default(0)\n  searchedAt        DateTime          @default(now())\n  relatedHashtags   HashtagRelation[] @relation(\"HashtagToRelated\")\n  relatedToHashtags HashtagRelation[] @relation(\"RelatedToHashtag\")\n  posts             Post[]\n  user              User              @relation(fields: [userId], references: [id])\n  hashtagSearch     HashtagSearch?    @relation(fields: [hashtagSearchId], references: [id])\n  hashtagSearchId   String?\n\n  @@index([userId])\n  @@index([hashtagSearchId])\n}\n\nmodel HashtagRelation {\n  id               String   @id @default(cuid())\n  hashtagId        String\n  relatedHashtagId String\n  hashtag          Hashtag  @relation(\"HashtagToRelated\", fields: [hashtagId], references: [id], onDelete: Cascade)\n  relatedHashtag   Hashtag  @relation(\"RelatedToHashtag\", fields: [relatedHashtagId], references: [id], onDelete: Cascade)\n  createdAt        DateTime @default(now())\n\n  @@unique([hashtagId, relatedHashtagId])\n  @@index([hashtagId])\n  @@index([relatedHashtagId])\n}\n\nmodel Post {\n  id           String   @id @default(cuid())\n  hashtagId    String\n  postId       String // Instagram post ID\n  caption      String?  @db.Text\n  likeCount    Int      @default(0)\n  commentCount Int      @default(0)\n  postedAt     DateTime\n  hashtag      Hashtag  @relation(fields: [hashtagId], references: [id], onDelete: Cascade)\n  createdAt    DateTime @default(now())\n\n  @@index([hashtagId])\n  @@index([postId])\n}\n\nmodel HashtagSearch {\n  id        String    @id @default(cuid())\n  userId    String\n  query     String\n  hashtags  Hashtag[]\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  user      User      @relation(fields: [userId], references: [id])\n\n  @@index([userId])\n  @@index([query])\n}\n\nmodel Hashtags {\n  id                  String            @id @default(cuid())\n  userId              String\n  name                String\n  imageUrl            String?\n  businessDescription String?\n  targetAudience      String?\n  searchedAt          DateTime          @default(now())\n  relatedHashtags     RelatedHashtags[]\n}\n\nmodel RelatedHashtags {\n  id        String   @id @default(cuid())\n  name      String\n  posts     Int      @default(0)\n  hashtagId String\n  hashtag   Hashtags @relation(fields: [hashtagId], references: [id], onDelete: Cascade)\n}\n\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n}\n\nmodel TwoFactorConfirmation {\n  id     String @id @default(cuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([userId])\n}\n",
  "inlineSchemaHash": "994105017574b4c4edbca8cf0b9262ad099a1ecbae575b1a56d3cf472d60873a",
  "copyEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"firstName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"isTwoFactorEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"website\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"twitter\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"facebook\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instagram\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"linkedin\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"youtube\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"github\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"discord\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tiktok\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"accounts\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToUser\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"subscription\",\"kind\":\"object\",\"type\":\"Subscription\",\"relationName\":\"SubscriptionToUser\"},{\"name\":\"integrations\",\"kind\":\"object\",\"type\":\"Integration\",\"relationName\":\"IntegrationToUser\"},{\"name\":\"automations\",\"kind\":\"object\",\"type\":\"Automation\",\"relationName\":\"AutomationToUser\"},{\"name\":\"hashtags\",\"kind\":\"object\",\"type\":\"Hashtag\",\"relationName\":\"HashtagToUser\"},{\"name\":\"hashtagSearches\",\"kind\":\"object\",\"type\":\"HashtagSearch\",\"relationName\":\"HashtagSearchToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"twoFactorConfirmation\",\"kind\":\"object\",\"type\":\"TwoFactorConfirmation\",\"relationName\":\"TwoFactorConfirmationToUser\"}],\"dbName\":null},\"Account\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"provider_account_id\"},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"access_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"token_type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"id_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session_state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AccountToUser\"}],\"dbName\":\"accounts\"},\"VerificationToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PasswordResetToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Integration\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"IntegrationToUser\"},{\"name\":\"automations\",\"kind\":\"object\",\"type\":\"Automation\",\"relationName\":\"AutomationToIntegration\"}],\"dbName\":\"integrations\"},\"Subscription\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"SubscriptionStatus\"},{\"name\":\"priceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"customerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stripeSubscriptionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"currentPeriodStart\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"currentPeriodEnd\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"cancelAtPeriodEnd\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"canceledAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"features\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SubscriptionToUser\"}],\"dbName\":\"subscriptions\"},\"SubscriptionPlan\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"priceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"interval\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"features\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"subscription_plans\"},\"Automation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"integrationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"stats\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastRunAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"nextRunAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AutomationToUser\"},{\"name\":\"integration\",\"kind\":\"object\",\"type\":\"Integration\",\"relationName\":\"AutomationToIntegration\"},{\"name\":\"tasks\",\"kind\":\"object\",\"type\":\"AutomationTask\",\"relationName\":\"AutomationToAutomationTask\"}],\"dbName\":\"automations\"},\"AutomationTask\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"automationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"result\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"error\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"automation\",\"kind\":\"object\",\"type\":\"Automation\",\"relationName\":\"AutomationToAutomationTask\"}],\"dbName\":\"automation_tasks\"},\"Hashtag\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"avgLikes\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"avgComments\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"searchedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"relatedHashtags\",\"kind\":\"object\",\"type\":\"HashtagRelation\",\"relationName\":\"HashtagToRelated\"},{\"name\":\"relatedToHashtags\",\"kind\":\"object\",\"type\":\"HashtagRelation\",\"relationName\":\"RelatedToHashtag\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"HashtagToPost\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"HashtagToUser\"},{\"name\":\"hashtagSearch\",\"kind\":\"object\",\"type\":\"HashtagSearch\",\"relationName\":\"HashtagToHashtagSearch\"},{\"name\":\"hashtagSearchId\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"HashtagRelation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashtagId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relatedHashtagId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashtag\",\"kind\":\"object\",\"type\":\"Hashtag\",\"relationName\":\"HashtagToRelated\"},{\"name\":\"relatedHashtag\",\"kind\":\"object\",\"type\":\"Hashtag\",\"relationName\":\"RelatedToHashtag\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Post\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashtagId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"caption\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"likeCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"commentCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"postedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"hashtag\",\"kind\":\"object\",\"type\":\"Hashtag\",\"relationName\":\"HashtagToPost\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"HashtagSearch\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"query\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashtags\",\"kind\":\"object\",\"type\":\"Hashtag\",\"relationName\":\"HashtagToHashtagSearch\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"HashtagSearchToUser\"}],\"dbName\":null},\"Hashtags\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"businessDescription\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetAudience\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"searchedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"relatedHashtags\",\"kind\":\"object\",\"type\":\"RelatedHashtags\",\"relationName\":\"HashtagsToRelatedHashtags\"}],\"dbName\":null},\"RelatedHashtags\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"posts\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"hashtagId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashtag\",\"kind\":\"object\",\"type\":\"Hashtags\",\"relationName\":\"HashtagsToRelatedHashtags\"}],\"dbName\":null},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"}],\"dbName\":null},\"TwoFactorConfirmation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TwoFactorConfirmationToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

