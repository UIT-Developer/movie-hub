
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Bookings
 * 
 */
export type Bookings = $Result.DefaultSelection<Prisma.$BookingsPayload>
/**
 * Model Tickets
 * 
 */
export type Tickets = $Result.DefaultSelection<Prisma.$TicketsPayload>
/**
 * Model Payments
 * 
 */
export type Payments = $Result.DefaultSelection<Prisma.$PaymentsPayload>
/**
 * Model Refunds
 * 
 */
export type Refunds = $Result.DefaultSelection<Prisma.$RefundsPayload>
/**
 * Model Concessions
 * 
 */
export type Concessions = $Result.DefaultSelection<Prisma.$ConcessionsPayload>
/**
 * Model BookingConcessions
 * 
 */
export type BookingConcessions = $Result.DefaultSelection<Prisma.$BookingConcessionsPayload>
/**
 * Model Promotions
 * 
 */
export type Promotions = $Result.DefaultSelection<Prisma.$PromotionsPayload>
/**
 * Model LoyaltyAccounts
 * 
 */
export type LoyaltyAccounts = $Result.DefaultSelection<Prisma.$LoyaltyAccountsPayload>
/**
 * Model LoyaltyTransactions
 * 
 */
export type LoyaltyTransactions = $Result.DefaultSelection<Prisma.$LoyaltyTransactionsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  COMPLETED: 'COMPLETED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const PaymentMethod: {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  MOMO: 'MOMO',
  ZALOPAY: 'ZALOPAY',
  VNPAY: 'VNPAY',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CASH: 'CASH'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const TicketStatus: {
  VALID: 'VALID',
  USED: 'USED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const RefundStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus]


export const ConcessionCategory: {
  FOOD: 'FOOD',
  DRINK: 'DRINK',
  COMBO: 'COMBO',
  MERCHANDISE: 'MERCHANDISE'
};

export type ConcessionCategory = (typeof ConcessionCategory)[keyof typeof ConcessionCategory]


export const PromotionType: {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  FREE_ITEM: 'FREE_ITEM',
  POINTS: 'POINTS'
};

export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType]


export const LoyaltyTransactionType: {
  EARN: 'EARN',
  REDEEM: 'REDEEM',
  EXPIRE: 'EXPIRE'
};

export type LoyaltyTransactionType = (typeof LoyaltyTransactionType)[keyof typeof LoyaltyTransactionType]


export const LoyaltyTier: {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM'
};

export type LoyaltyTier = (typeof LoyaltyTier)[keyof typeof LoyaltyTier]

}

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type RefundStatus = $Enums.RefundStatus

export const RefundStatus: typeof $Enums.RefundStatus

export type ConcessionCategory = $Enums.ConcessionCategory

export const ConcessionCategory: typeof $Enums.ConcessionCategory

export type PromotionType = $Enums.PromotionType

export const PromotionType: typeof $Enums.PromotionType

export type LoyaltyTransactionType = $Enums.LoyaltyTransactionType

export const LoyaltyTransactionType: typeof $Enums.LoyaltyTransactionType

export type LoyaltyTier = $Enums.LoyaltyTier

export const LoyaltyTier: typeof $Enums.LoyaltyTier

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bookings
 * const bookings = await prisma.bookings.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bookings
   * const bookings = await prisma.bookings.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bookings`: Exposes CRUD operations for the **Bookings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.bookings.findMany()
    * ```
    */
  get bookings(): Prisma.BookingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tickets`: Exposes CRUD operations for the **Tickets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.tickets.findMany()
    * ```
    */
  get tickets(): Prisma.TicketsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payments`: Exposes CRUD operations for the **Payments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payments.findMany()
    * ```
    */
  get payments(): Prisma.PaymentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refunds`: Exposes CRUD operations for the **Refunds** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Refunds
    * const refunds = await prisma.refunds.findMany()
    * ```
    */
  get refunds(): Prisma.RefundsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concessions`: Exposes CRUD operations for the **Concessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Concessions
    * const concessions = await prisma.concessions.findMany()
    * ```
    */
  get concessions(): Prisma.ConcessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookingConcessions`: Exposes CRUD operations for the **BookingConcessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingConcessions
    * const bookingConcessions = await prisma.bookingConcessions.findMany()
    * ```
    */
  get bookingConcessions(): Prisma.BookingConcessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promotions`: Exposes CRUD operations for the **Promotions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promotions
    * const promotions = await prisma.promotions.findMany()
    * ```
    */
  get promotions(): Prisma.PromotionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyAccounts`: Exposes CRUD operations for the **LoyaltyAccounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyAccounts
    * const loyaltyAccounts = await prisma.loyaltyAccounts.findMany()
    * ```
    */
  get loyaltyAccounts(): Prisma.LoyaltyAccountsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyTransactions`: Exposes CRUD operations for the **LoyaltyTransactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyTransactions
    * const loyaltyTransactions = await prisma.loyaltyTransactions.findMany()
    * ```
    */
  get loyaltyTransactions(): Prisma.LoyaltyTransactionsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Bookings: 'Bookings',
    Tickets: 'Tickets',
    Payments: 'Payments',
    Refunds: 'Refunds',
    Concessions: 'Concessions',
    BookingConcessions: 'BookingConcessions',
    Promotions: 'Promotions',
    LoyaltyAccounts: 'LoyaltyAccounts',
    LoyaltyTransactions: 'LoyaltyTransactions'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bookings" | "tickets" | "payments" | "refunds" | "concessions" | "bookingConcessions" | "promotions" | "loyaltyAccounts" | "loyaltyTransactions"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Bookings: {
        payload: Prisma.$BookingsPayload<ExtArgs>
        fields: Prisma.BookingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          findFirst: {
            args: Prisma.BookingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          findMany: {
            args: Prisma.BookingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>[]
          }
          create: {
            args: Prisma.BookingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          createMany: {
            args: Prisma.BookingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>[]
          }
          delete: {
            args: Prisma.BookingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          update: {
            args: Prisma.BookingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          deleteMany: {
            args: Prisma.BookingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>[]
          }
          upsert: {
            args: Prisma.BookingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingsPayload>
          }
          aggregate: {
            args: Prisma.BookingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookings>
          }
          groupBy: {
            args: Prisma.BookingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingsCountArgs<ExtArgs>
            result: $Utils.Optional<BookingsCountAggregateOutputType> | number
          }
        }
      }
      Tickets: {
        payload: Prisma.$TicketsPayload<ExtArgs>
        fields: Prisma.TicketsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          findFirst: {
            args: Prisma.TicketsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          findMany: {
            args: Prisma.TicketsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>[]
          }
          create: {
            args: Prisma.TicketsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          createMany: {
            args: Prisma.TicketsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>[]
          }
          delete: {
            args: Prisma.TicketsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          update: {
            args: Prisma.TicketsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          deleteMany: {
            args: Prisma.TicketsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>[]
          }
          upsert: {
            args: Prisma.TicketsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketsPayload>
          }
          aggregate: {
            args: Prisma.TicketsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTickets>
          }
          groupBy: {
            args: Prisma.TicketsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketsCountArgs<ExtArgs>
            result: $Utils.Optional<TicketsCountAggregateOutputType> | number
          }
        }
      }
      Payments: {
        payload: Prisma.$PaymentsPayload<ExtArgs>
        fields: Prisma.PaymentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          findFirst: {
            args: Prisma.PaymentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          findMany: {
            args: Prisma.PaymentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          create: {
            args: Prisma.PaymentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          createMany: {
            args: Prisma.PaymentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          delete: {
            args: Prisma.PaymentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          update: {
            args: Prisma.PaymentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          deleteMany: {
            args: Prisma.PaymentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          upsert: {
            args: Prisma.PaymentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          aggregate: {
            args: Prisma.PaymentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayments>
          }
          groupBy: {
            args: Prisma.PaymentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentsCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentsCountAggregateOutputType> | number
          }
        }
      }
      Refunds: {
        payload: Prisma.$RefundsPayload<ExtArgs>
        fields: Prisma.RefundsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefundsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefundsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          findFirst: {
            args: Prisma.RefundsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefundsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          findMany: {
            args: Prisma.RefundsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>[]
          }
          create: {
            args: Prisma.RefundsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          createMany: {
            args: Prisma.RefundsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefundsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>[]
          }
          delete: {
            args: Prisma.RefundsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          update: {
            args: Prisma.RefundsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          deleteMany: {
            args: Prisma.RefundsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefundsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefundsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>[]
          }
          upsert: {
            args: Prisma.RefundsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundsPayload>
          }
          aggregate: {
            args: Prisma.RefundsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefunds>
          }
          groupBy: {
            args: Prisma.RefundsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefundsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefundsCountArgs<ExtArgs>
            result: $Utils.Optional<RefundsCountAggregateOutputType> | number
          }
        }
      }
      Concessions: {
        payload: Prisma.$ConcessionsPayload<ExtArgs>
        fields: Prisma.ConcessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConcessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConcessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          findFirst: {
            args: Prisma.ConcessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConcessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          findMany: {
            args: Prisma.ConcessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>[]
          }
          create: {
            args: Prisma.ConcessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          createMany: {
            args: Prisma.ConcessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConcessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>[]
          }
          delete: {
            args: Prisma.ConcessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          update: {
            args: Prisma.ConcessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          deleteMany: {
            args: Prisma.ConcessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConcessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConcessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>[]
          }
          upsert: {
            args: Prisma.ConcessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionsPayload>
          }
          aggregate: {
            args: Prisma.ConcessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConcessions>
          }
          groupBy: {
            args: Prisma.ConcessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConcessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConcessionsCountArgs<ExtArgs>
            result: $Utils.Optional<ConcessionsCountAggregateOutputType> | number
          }
        }
      }
      BookingConcessions: {
        payload: Prisma.$BookingConcessionsPayload<ExtArgs>
        fields: Prisma.BookingConcessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingConcessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingConcessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          findFirst: {
            args: Prisma.BookingConcessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingConcessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          findMany: {
            args: Prisma.BookingConcessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>[]
          }
          create: {
            args: Prisma.BookingConcessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          createMany: {
            args: Prisma.BookingConcessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingConcessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>[]
          }
          delete: {
            args: Prisma.BookingConcessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          update: {
            args: Prisma.BookingConcessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          deleteMany: {
            args: Prisma.BookingConcessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingConcessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingConcessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>[]
          }
          upsert: {
            args: Prisma.BookingConcessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingConcessionsPayload>
          }
          aggregate: {
            args: Prisma.BookingConcessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookingConcessions>
          }
          groupBy: {
            args: Prisma.BookingConcessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingConcessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingConcessionsCountArgs<ExtArgs>
            result: $Utils.Optional<BookingConcessionsCountAggregateOutputType> | number
          }
        }
      }
      Promotions: {
        payload: Prisma.$PromotionsPayload<ExtArgs>
        fields: Prisma.PromotionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromotionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromotionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          findFirst: {
            args: Prisma.PromotionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromotionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          findMany: {
            args: Prisma.PromotionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>[]
          }
          create: {
            args: Prisma.PromotionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          createMany: {
            args: Prisma.PromotionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromotionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>[]
          }
          delete: {
            args: Prisma.PromotionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          update: {
            args: Prisma.PromotionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          deleteMany: {
            args: Prisma.PromotionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromotionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromotionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>[]
          }
          upsert: {
            args: Prisma.PromotionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionsPayload>
          }
          aggregate: {
            args: Prisma.PromotionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromotions>
          }
          groupBy: {
            args: Prisma.PromotionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromotionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromotionsCountArgs<ExtArgs>
            result: $Utils.Optional<PromotionsCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyAccounts: {
        payload: Prisma.$LoyaltyAccountsPayload<ExtArgs>
        fields: Prisma.LoyaltyAccountsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyAccountsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyAccountsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyAccountsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyAccountsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          findMany: {
            args: Prisma.LoyaltyAccountsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>[]
          }
          create: {
            args: Prisma.LoyaltyAccountsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          createMany: {
            args: Prisma.LoyaltyAccountsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyAccountsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyAccountsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          update: {
            args: Prisma.LoyaltyAccountsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyAccountsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyAccountsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyAccountsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyAccountsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyAccountsPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyAccountsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyAccounts>
          }
          groupBy: {
            args: Prisma.LoyaltyAccountsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyAccountsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyAccountsCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyAccountsCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyTransactions: {
        payload: Prisma.$LoyaltyTransactionsPayload<ExtArgs>
        fields: Prisma.LoyaltyTransactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyTransactionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyTransactionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyTransactionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyTransactionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          findMany: {
            args: Prisma.LoyaltyTransactionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>[]
          }
          create: {
            args: Prisma.LoyaltyTransactionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          createMany: {
            args: Prisma.LoyaltyTransactionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyTransactionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyTransactionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          update: {
            args: Prisma.LoyaltyTransactionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyTransactionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyTransactionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyTransactionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyTransactionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyTransactionsPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyTransactionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyTransactions>
          }
          groupBy: {
            args: Prisma.LoyaltyTransactionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyTransactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyTransactionsCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyTransactionsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bookings?: BookingsOmit
    tickets?: TicketsOmit
    payments?: PaymentsOmit
    refunds?: RefundsOmit
    concessions?: ConcessionsOmit
    bookingConcessions?: BookingConcessionsOmit
    promotions?: PromotionsOmit
    loyaltyAccounts?: LoyaltyAccountsOmit
    loyaltyTransactions?: LoyaltyTransactionsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BookingsCountOutputType
   */

  export type BookingsCountOutputType = {
    tickets: number
    payments: number
    booking_concessions: number
  }

  export type BookingsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | BookingsCountOutputTypeCountTicketsArgs
    payments?: boolean | BookingsCountOutputTypeCountPaymentsArgs
    booking_concessions?: boolean | BookingsCountOutputTypeCountBooking_concessionsArgs
  }

  // Custom InputTypes
  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingsCountOutputType
     */
    select?: BookingsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketsWhereInput
  }

  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentsWhereInput
  }

  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeCountBooking_concessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingConcessionsWhereInput
  }


  /**
   * Count Type PaymentsCountOutputType
   */

  export type PaymentsCountOutputType = {
    refunds: number
  }

  export type PaymentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refunds?: boolean | PaymentsCountOutputTypeCountRefundsArgs
  }

  // Custom InputTypes
  /**
   * PaymentsCountOutputType without action
   */
  export type PaymentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentsCountOutputType
     */
    select?: PaymentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentsCountOutputType without action
   */
  export type PaymentsCountOutputTypeCountRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundsWhereInput
  }


  /**
   * Count Type ConcessionsCountOutputType
   */

  export type ConcessionsCountOutputType = {
    booking_concessions: number
  }

  export type ConcessionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_concessions?: boolean | ConcessionsCountOutputTypeCountBooking_concessionsArgs
  }

  // Custom InputTypes
  /**
   * ConcessionsCountOutputType without action
   */
  export type ConcessionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionsCountOutputType
     */
    select?: ConcessionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConcessionsCountOutputType without action
   */
  export type ConcessionsCountOutputTypeCountBooking_concessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingConcessionsWhereInput
  }


  /**
   * Count Type LoyaltyAccountsCountOutputType
   */

  export type LoyaltyAccountsCountOutputType = {
    transactions: number
  }

  export type LoyaltyAccountsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | LoyaltyAccountsCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * LoyaltyAccountsCountOutputType without action
   */
  export type LoyaltyAccountsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccountsCountOutputType
     */
    select?: LoyaltyAccountsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoyaltyAccountsCountOutputType without action
   */
  export type LoyaltyAccountsCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyTransactionsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Bookings
   */

  export type AggregateBookings = {
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  export type BookingsAvgAggregateOutputType = {
    subtotal: Decimal | null
    discount: Decimal | null
    points_used: number | null
    points_discount: Decimal | null
    final_amount: Decimal | null
  }

  export type BookingsSumAggregateOutputType = {
    subtotal: Decimal | null
    discount: Decimal | null
    points_used: number | null
    points_discount: Decimal | null
    final_amount: Decimal | null
  }

  export type BookingsMinAggregateOutputType = {
    id: string | null
    booking_code: string | null
    user_id: string | null
    showtime_id: string | null
    customer_name: string | null
    customer_email: string | null
    customer_phone: string | null
    subtotal: Decimal | null
    discount: Decimal | null
    points_used: number | null
    points_discount: Decimal | null
    final_amount: Decimal | null
    promotion_code: string | null
    status: $Enums.BookingStatus | null
    payment_status: $Enums.PaymentStatus | null
    expires_at: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BookingsMaxAggregateOutputType = {
    id: string | null
    booking_code: string | null
    user_id: string | null
    showtime_id: string | null
    customer_name: string | null
    customer_email: string | null
    customer_phone: string | null
    subtotal: Decimal | null
    discount: Decimal | null
    points_used: number | null
    points_discount: Decimal | null
    final_amount: Decimal | null
    promotion_code: string | null
    status: $Enums.BookingStatus | null
    payment_status: $Enums.PaymentStatus | null
    expires_at: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BookingsCountAggregateOutputType = {
    id: number
    booking_code: number
    user_id: number
    showtime_id: number
    customer_name: number
    customer_email: number
    customer_phone: number
    subtotal: number
    discount: number
    points_used: number
    points_discount: number
    final_amount: number
    promotion_code: number
    status: number
    payment_status: number
    expires_at: number
    cancelled_at: number
    cancellation_reason: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BookingsAvgAggregateInputType = {
    subtotal?: true
    discount?: true
    points_used?: true
    points_discount?: true
    final_amount?: true
  }

  export type BookingsSumAggregateInputType = {
    subtotal?: true
    discount?: true
    points_used?: true
    points_discount?: true
    final_amount?: true
  }

  export type BookingsMinAggregateInputType = {
    id?: true
    booking_code?: true
    user_id?: true
    showtime_id?: true
    customer_name?: true
    customer_email?: true
    customer_phone?: true
    subtotal?: true
    discount?: true
    points_used?: true
    points_discount?: true
    final_amount?: true
    promotion_code?: true
    status?: true
    payment_status?: true
    expires_at?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type BookingsMaxAggregateInputType = {
    id?: true
    booking_code?: true
    user_id?: true
    showtime_id?: true
    customer_name?: true
    customer_email?: true
    customer_phone?: true
    subtotal?: true
    discount?: true
    points_used?: true
    points_discount?: true
    final_amount?: true
    promotion_code?: true
    status?: true
    payment_status?: true
    expires_at?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type BookingsCountAggregateInputType = {
    id?: true
    booking_code?: true
    user_id?: true
    showtime_id?: true
    customer_name?: true
    customer_email?: true
    customer_phone?: true
    subtotal?: true
    discount?: true
    points_used?: true
    points_discount?: true
    final_amount?: true
    promotion_code?: true
    status?: true
    payment_status?: true
    expires_at?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BookingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to aggregate.
     */
    where?: BookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingsOrderByWithRelationInput | BookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingsMaxAggregateInputType
  }

  export type GetBookingsAggregateType<T extends BookingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBookings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookings[P]>
      : GetScalarType<T[P], AggregateBookings[P]>
  }




  export type BookingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingsWhereInput
    orderBy?: BookingsOrderByWithAggregationInput | BookingsOrderByWithAggregationInput[]
    by: BookingsScalarFieldEnum[] | BookingsScalarFieldEnum
    having?: BookingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingsCountAggregateInputType | true
    _avg?: BookingsAvgAggregateInputType
    _sum?: BookingsSumAggregateInputType
    _min?: BookingsMinAggregateInputType
    _max?: BookingsMaxAggregateInputType
  }

  export type BookingsGroupByOutputType = {
    id: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone: string | null
    subtotal: Decimal
    discount: Decimal
    points_used: number
    points_discount: Decimal
    final_amount: Decimal
    promotion_code: string | null
    status: $Enums.BookingStatus
    payment_status: $Enums.PaymentStatus
    expires_at: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date
    updated_at: Date
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  type GetBookingsGroupByPayload<T extends BookingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingsGroupByOutputType[P]>
            : GetScalarType<T[P], BookingsGroupByOutputType[P]>
        }
      >
    >


  export type BookingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_code?: boolean
    user_id?: boolean
    showtime_id?: boolean
    customer_name?: boolean
    customer_email?: boolean
    customer_phone?: boolean
    subtotal?: boolean
    discount?: boolean
    points_used?: boolean
    points_discount?: boolean
    final_amount?: boolean
    promotion_code?: boolean
    status?: boolean
    payment_status?: boolean
    expires_at?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    tickets?: boolean | Bookings$ticketsArgs<ExtArgs>
    payments?: boolean | Bookings$paymentsArgs<ExtArgs>
    booking_concessions?: boolean | Bookings$booking_concessionsArgs<ExtArgs>
    _count?: boolean | BookingsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookings"]>

  export type BookingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_code?: boolean
    user_id?: boolean
    showtime_id?: boolean
    customer_name?: boolean
    customer_email?: boolean
    customer_phone?: boolean
    subtotal?: boolean
    discount?: boolean
    points_used?: boolean
    points_discount?: boolean
    final_amount?: boolean
    promotion_code?: boolean
    status?: boolean
    payment_status?: boolean
    expires_at?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["bookings"]>

  export type BookingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_code?: boolean
    user_id?: boolean
    showtime_id?: boolean
    customer_name?: boolean
    customer_email?: boolean
    customer_phone?: boolean
    subtotal?: boolean
    discount?: boolean
    points_used?: boolean
    points_discount?: boolean
    final_amount?: boolean
    promotion_code?: boolean
    status?: boolean
    payment_status?: boolean
    expires_at?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["bookings"]>

  export type BookingsSelectScalar = {
    id?: boolean
    booking_code?: boolean
    user_id?: boolean
    showtime_id?: boolean
    customer_name?: boolean
    customer_email?: boolean
    customer_phone?: boolean
    subtotal?: boolean
    discount?: boolean
    points_used?: boolean
    points_discount?: boolean
    final_amount?: boolean
    promotion_code?: boolean
    status?: boolean
    payment_status?: boolean
    expires_at?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BookingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_code" | "user_id" | "showtime_id" | "customer_name" | "customer_email" | "customer_phone" | "subtotal" | "discount" | "points_used" | "points_discount" | "final_amount" | "promotion_code" | "status" | "payment_status" | "expires_at" | "cancelled_at" | "cancellation_reason" | "created_at" | "updated_at", ExtArgs["result"]["bookings"]>
  export type BookingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | Bookings$ticketsArgs<ExtArgs>
    payments?: boolean | Bookings$paymentsArgs<ExtArgs>
    booking_concessions?: boolean | Bookings$booking_concessionsArgs<ExtArgs>
    _count?: boolean | BookingsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BookingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BookingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookings"
    objects: {
      tickets: Prisma.$TicketsPayload<ExtArgs>[]
      payments: Prisma.$PaymentsPayload<ExtArgs>[]
      booking_concessions: Prisma.$BookingConcessionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_code: string
      user_id: string
      showtime_id: string
      customer_name: string
      customer_email: string
      customer_phone: string | null
      subtotal: Prisma.Decimal
      discount: Prisma.Decimal
      points_used: number
      points_discount: Prisma.Decimal
      final_amount: Prisma.Decimal
      promotion_code: string | null
      status: $Enums.BookingStatus
      payment_status: $Enums.PaymentStatus
      expires_at: Date | null
      cancelled_at: Date | null
      cancellation_reason: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["bookings"]>
    composites: {}
  }

  type BookingsGetPayload<S extends boolean | null | undefined | BookingsDefaultArgs> = $Result.GetResult<Prisma.$BookingsPayload, S>

  type BookingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingsCountAggregateInputType | true
    }

  export interface BookingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookings'], meta: { name: 'Bookings' } }
    /**
     * Find zero or one Bookings that matches the filter.
     * @param {BookingsFindUniqueArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingsFindUniqueArgs>(args: SelectSubset<T, BookingsFindUniqueArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingsFindUniqueOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingsFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsFindFirstArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingsFindFirstArgs>(args?: SelectSubset<T, BookingsFindFirstArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsFindFirstOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingsFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.bookings.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.bookings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingsWithIdOnly = await prisma.bookings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingsFindManyArgs>(args?: SelectSubset<T, BookingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookings.
     * @param {BookingsCreateArgs} args - Arguments to create a Bookings.
     * @example
     * // Create one Bookings
     * const Bookings = await prisma.bookings.create({
     *   data: {
     *     // ... data to create a Bookings
     *   }
     * })
     * 
     */
    create<T extends BookingsCreateArgs>(args: SelectSubset<T, BookingsCreateArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingsCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const bookings = await prisma.bookings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingsCreateManyArgs>(args?: SelectSubset<T, BookingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingsCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const bookings = await prisma.bookings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingsWithIdOnly = await prisma.bookings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingsCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookings.
     * @param {BookingsDeleteArgs} args - Arguments to delete one Bookings.
     * @example
     * // Delete one Bookings
     * const Bookings = await prisma.bookings.delete({
     *   where: {
     *     // ... filter to delete one Bookings
     *   }
     * })
     * 
     */
    delete<T extends BookingsDeleteArgs>(args: SelectSubset<T, BookingsDeleteArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookings.
     * @param {BookingsUpdateArgs} args - Arguments to update one Bookings.
     * @example
     * // Update one Bookings
     * const bookings = await prisma.bookings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingsUpdateArgs>(args: SelectSubset<T, BookingsUpdateArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingsDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.bookings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingsDeleteManyArgs>(args?: SelectSubset<T, BookingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const bookings = await prisma.bookings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingsUpdateManyArgs>(args: SelectSubset<T, BookingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingsUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const bookings = await prisma.bookings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingsWithIdOnly = await prisma.bookings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingsUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookings.
     * @param {BookingsUpsertArgs} args - Arguments to update or create a Bookings.
     * @example
     * // Update or create a Bookings
     * const bookings = await prisma.bookings.upsert({
     *   create: {
     *     // ... data to create a Bookings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookings we want to update
     *   }
     * })
     */
    upsert<T extends BookingsUpsertArgs>(args: SelectSubset<T, BookingsUpsertArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.bookings.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingsCountArgs>(
      args?: Subset<T, BookingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingsAggregateArgs>(args: Subset<T, BookingsAggregateArgs>): Prisma.PrismaPromise<GetBookingsAggregateType<T>>

    /**
     * Group by Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingsGroupByArgs['orderBy'] }
        : { orderBy?: BookingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookings model
   */
  readonly fields: BookingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tickets<T extends Bookings$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Bookings$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Bookings$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Bookings$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    booking_concessions<T extends Bookings$booking_concessionsArgs<ExtArgs> = {}>(args?: Subset<T, Bookings$booking_concessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookings model
   */
  interface BookingsFieldRefs {
    readonly id: FieldRef<"Bookings", 'String'>
    readonly booking_code: FieldRef<"Bookings", 'String'>
    readonly user_id: FieldRef<"Bookings", 'String'>
    readonly showtime_id: FieldRef<"Bookings", 'String'>
    readonly customer_name: FieldRef<"Bookings", 'String'>
    readonly customer_email: FieldRef<"Bookings", 'String'>
    readonly customer_phone: FieldRef<"Bookings", 'String'>
    readonly subtotal: FieldRef<"Bookings", 'Decimal'>
    readonly discount: FieldRef<"Bookings", 'Decimal'>
    readonly points_used: FieldRef<"Bookings", 'Int'>
    readonly points_discount: FieldRef<"Bookings", 'Decimal'>
    readonly final_amount: FieldRef<"Bookings", 'Decimal'>
    readonly promotion_code: FieldRef<"Bookings", 'String'>
    readonly status: FieldRef<"Bookings", 'BookingStatus'>
    readonly payment_status: FieldRef<"Bookings", 'PaymentStatus'>
    readonly expires_at: FieldRef<"Bookings", 'DateTime'>
    readonly cancelled_at: FieldRef<"Bookings", 'DateTime'>
    readonly cancellation_reason: FieldRef<"Bookings", 'String'>
    readonly created_at: FieldRef<"Bookings", 'DateTime'>
    readonly updated_at: FieldRef<"Bookings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bookings findUnique
   */
  export type BookingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where: BookingsWhereUniqueInput
  }

  /**
   * Bookings findUniqueOrThrow
   */
  export type BookingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where: BookingsWhereUniqueInput
  }

  /**
   * Bookings findFirst
   */
  export type BookingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingsOrderByWithRelationInput | BookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * Bookings findFirstOrThrow
   */
  export type BookingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingsOrderByWithRelationInput | BookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * Bookings findMany
   */
  export type BookingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingsOrderByWithRelationInput | BookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * Bookings create
   */
  export type BookingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookings.
     */
    data: XOR<BookingsCreateInput, BookingsUncheckedCreateInput>
  }

  /**
   * Bookings createMany
   */
  export type BookingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingsCreateManyInput | BookingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookings createManyAndReturn
   */
  export type BookingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingsCreateManyInput | BookingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookings update
   */
  export type BookingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookings.
     */
    data: XOR<BookingsUpdateInput, BookingsUncheckedUpdateInput>
    /**
     * Choose, which Bookings to update.
     */
    where: BookingsWhereUniqueInput
  }

  /**
   * Bookings updateMany
   */
  export type BookingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingsUpdateManyMutationInput, BookingsUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingsWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Bookings updateManyAndReturn
   */
  export type BookingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingsUpdateManyMutationInput, BookingsUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingsWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Bookings upsert
   */
  export type BookingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookings to update in case it exists.
     */
    where: BookingsWhereUniqueInput
    /**
     * In case the Bookings found by the `where` argument doesn't exist, create a new Bookings with this data.
     */
    create: XOR<BookingsCreateInput, BookingsUncheckedCreateInput>
    /**
     * In case the Bookings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingsUpdateInput, BookingsUncheckedUpdateInput>
  }

  /**
   * Bookings delete
   */
  export type BookingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
    /**
     * Filter which Bookings to delete.
     */
    where: BookingsWhereUniqueInput
  }

  /**
   * Bookings deleteMany
   */
  export type BookingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingsWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Bookings.tickets
   */
  export type Bookings$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    where?: TicketsWhereInput
    orderBy?: TicketsOrderByWithRelationInput | TicketsOrderByWithRelationInput[]
    cursor?: TicketsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketsScalarFieldEnum | TicketsScalarFieldEnum[]
  }

  /**
   * Bookings.payments
   */
  export type Bookings$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    where?: PaymentsWhereInput
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    cursor?: PaymentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Bookings.booking_concessions
   */
  export type Bookings$booking_concessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    where?: BookingConcessionsWhereInput
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    cursor?: BookingConcessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingConcessionsScalarFieldEnum | BookingConcessionsScalarFieldEnum[]
  }

  /**
   * Bookings without action
   */
  export type BookingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookings
     */
    select?: BookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookings
     */
    omit?: BookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingsInclude<ExtArgs> | null
  }


  /**
   * Model Tickets
   */

  export type AggregateTickets = {
    _count: TicketsCountAggregateOutputType | null
    _avg: TicketsAvgAggregateOutputType | null
    _sum: TicketsSumAggregateOutputType | null
    _min: TicketsMinAggregateOutputType | null
    _max: TicketsMaxAggregateOutputType | null
  }

  export type TicketsAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type TicketsSumAggregateOutputType = {
    price: Decimal | null
  }

  export type TicketsMinAggregateOutputType = {
    id: string | null
    booking_id: string | null
    seat_id: string | null
    ticket_code: string | null
    qr_code: string | null
    barcode: string | null
    ticket_type: string | null
    price: Decimal | null
    status: $Enums.TicketStatus | null
    used_at: Date | null
    created_at: Date | null
  }

  export type TicketsMaxAggregateOutputType = {
    id: string | null
    booking_id: string | null
    seat_id: string | null
    ticket_code: string | null
    qr_code: string | null
    barcode: string | null
    ticket_type: string | null
    price: Decimal | null
    status: $Enums.TicketStatus | null
    used_at: Date | null
    created_at: Date | null
  }

  export type TicketsCountAggregateOutputType = {
    id: number
    booking_id: number
    seat_id: number
    ticket_code: number
    qr_code: number
    barcode: number
    ticket_type: number
    price: number
    status: number
    used_at: number
    created_at: number
    _all: number
  }


  export type TicketsAvgAggregateInputType = {
    price?: true
  }

  export type TicketsSumAggregateInputType = {
    price?: true
  }

  export type TicketsMinAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    ticket_code?: true
    qr_code?: true
    barcode?: true
    ticket_type?: true
    price?: true
    status?: true
    used_at?: true
    created_at?: true
  }

  export type TicketsMaxAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    ticket_code?: true
    qr_code?: true
    barcode?: true
    ticket_type?: true
    price?: true
    status?: true
    used_at?: true
    created_at?: true
  }

  export type TicketsCountAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    ticket_code?: true
    qr_code?: true
    barcode?: true
    ticket_type?: true
    price?: true
    status?: true
    used_at?: true
    created_at?: true
    _all?: true
  }

  export type TicketsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to aggregate.
     */
    where?: TicketsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketsOrderByWithRelationInput | TicketsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketsMaxAggregateInputType
  }

  export type GetTicketsAggregateType<T extends TicketsAggregateArgs> = {
        [P in keyof T & keyof AggregateTickets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTickets[P]>
      : GetScalarType<T[P], AggregateTickets[P]>
  }




  export type TicketsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketsWhereInput
    orderBy?: TicketsOrderByWithAggregationInput | TicketsOrderByWithAggregationInput[]
    by: TicketsScalarFieldEnum[] | TicketsScalarFieldEnum
    having?: TicketsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketsCountAggregateInputType | true
    _avg?: TicketsAvgAggregateInputType
    _sum?: TicketsSumAggregateInputType
    _min?: TicketsMinAggregateInputType
    _max?: TicketsMaxAggregateInputType
  }

  export type TicketsGroupByOutputType = {
    id: string
    booking_id: string
    seat_id: string
    ticket_code: string
    qr_code: string | null
    barcode: string | null
    ticket_type: string
    price: Decimal
    status: $Enums.TicketStatus
    used_at: Date | null
    created_at: Date
    _count: TicketsCountAggregateOutputType | null
    _avg: TicketsAvgAggregateOutputType | null
    _sum: TicketsSumAggregateOutputType | null
    _min: TicketsMinAggregateOutputType | null
    _max: TicketsMaxAggregateOutputType | null
  }

  type GetTicketsGroupByPayload<T extends TicketsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketsGroupByOutputType[P]>
            : GetScalarType<T[P], TicketsGroupByOutputType[P]>
        }
      >
    >


  export type TicketsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    ticket_code?: boolean
    qr_code?: boolean
    barcode?: boolean
    ticket_type?: boolean
    price?: boolean
    status?: boolean
    used_at?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tickets"]>

  export type TicketsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    ticket_code?: boolean
    qr_code?: boolean
    barcode?: boolean
    ticket_type?: boolean
    price?: boolean
    status?: boolean
    used_at?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tickets"]>

  export type TicketsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    ticket_code?: boolean
    qr_code?: boolean
    barcode?: boolean
    ticket_type?: boolean
    price?: boolean
    status?: boolean
    used_at?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tickets"]>

  export type TicketsSelectScalar = {
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    ticket_code?: boolean
    qr_code?: boolean
    barcode?: boolean
    ticket_type?: boolean
    price?: boolean
    status?: boolean
    used_at?: boolean
    created_at?: boolean
  }

  export type TicketsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "seat_id" | "ticket_code" | "qr_code" | "barcode" | "ticket_type" | "price" | "status" | "used_at" | "created_at", ExtArgs["result"]["tickets"]>
  export type TicketsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }
  export type TicketsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }
  export type TicketsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }

  export type $TicketsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tickets"
    objects: {
      booking: Prisma.$BookingsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_id: string
      seat_id: string
      ticket_code: string
      qr_code: string | null
      barcode: string | null
      ticket_type: string
      price: Prisma.Decimal
      status: $Enums.TicketStatus
      used_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["tickets"]>
    composites: {}
  }

  type TicketsGetPayload<S extends boolean | null | undefined | TicketsDefaultArgs> = $Result.GetResult<Prisma.$TicketsPayload, S>

  type TicketsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketsCountAggregateInputType | true
    }

  export interface TicketsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tickets'], meta: { name: 'Tickets' } }
    /**
     * Find zero or one Tickets that matches the filter.
     * @param {TicketsFindUniqueArgs} args - Arguments to find a Tickets
     * @example
     * // Get one Tickets
     * const tickets = await prisma.tickets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketsFindUniqueArgs>(args: SelectSubset<T, TicketsFindUniqueArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tickets that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketsFindUniqueOrThrowArgs} args - Arguments to find a Tickets
     * @example
     * // Get one Tickets
     * const tickets = await prisma.tickets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketsFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsFindFirstArgs} args - Arguments to find a Tickets
     * @example
     * // Get one Tickets
     * const tickets = await prisma.tickets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketsFindFirstArgs>(args?: SelectSubset<T, TicketsFindFirstArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tickets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsFindFirstOrThrowArgs} args - Arguments to find a Tickets
     * @example
     * // Get one Tickets
     * const tickets = await prisma.tickets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketsFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.tickets.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.tickets.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketsWithIdOnly = await prisma.tickets.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketsFindManyArgs>(args?: SelectSubset<T, TicketsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tickets.
     * @param {TicketsCreateArgs} args - Arguments to create a Tickets.
     * @example
     * // Create one Tickets
     * const Tickets = await prisma.tickets.create({
     *   data: {
     *     // ... data to create a Tickets
     *   }
     * })
     * 
     */
    create<T extends TicketsCreateArgs>(args: SelectSubset<T, TicketsCreateArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketsCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const tickets = await prisma.tickets.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketsCreateManyArgs>(args?: SelectSubset<T, TicketsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketsCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const tickets = await prisma.tickets.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketsWithIdOnly = await prisma.tickets.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketsCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tickets.
     * @param {TicketsDeleteArgs} args - Arguments to delete one Tickets.
     * @example
     * // Delete one Tickets
     * const Tickets = await prisma.tickets.delete({
     *   where: {
     *     // ... filter to delete one Tickets
     *   }
     * })
     * 
     */
    delete<T extends TicketsDeleteArgs>(args: SelectSubset<T, TicketsDeleteArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tickets.
     * @param {TicketsUpdateArgs} args - Arguments to update one Tickets.
     * @example
     * // Update one Tickets
     * const tickets = await prisma.tickets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketsUpdateArgs>(args: SelectSubset<T, TicketsUpdateArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketsDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.tickets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketsDeleteManyArgs>(args?: SelectSubset<T, TicketsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const tickets = await prisma.tickets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketsUpdateManyArgs>(args: SelectSubset<T, TicketsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketsUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const tickets = await prisma.tickets.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketsWithIdOnly = await prisma.tickets.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketsUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tickets.
     * @param {TicketsUpsertArgs} args - Arguments to update or create a Tickets.
     * @example
     * // Update or create a Tickets
     * const tickets = await prisma.tickets.upsert({
     *   create: {
     *     // ... data to create a Tickets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tickets we want to update
     *   }
     * })
     */
    upsert<T extends TicketsUpsertArgs>(args: SelectSubset<T, TicketsUpsertArgs<ExtArgs>>): Prisma__TicketsClient<$Result.GetResult<Prisma.$TicketsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.tickets.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketsCountArgs>(
      args?: Subset<T, TicketsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketsAggregateArgs>(args: Subset<T, TicketsAggregateArgs>): Prisma.PrismaPromise<GetTicketsAggregateType<T>>

    /**
     * Group by Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketsGroupByArgs['orderBy'] }
        : { orderBy?: TicketsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tickets model
   */
  readonly fields: TicketsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tickets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingsDefaultArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tickets model
   */
  interface TicketsFieldRefs {
    readonly id: FieldRef<"Tickets", 'String'>
    readonly booking_id: FieldRef<"Tickets", 'String'>
    readonly seat_id: FieldRef<"Tickets", 'String'>
    readonly ticket_code: FieldRef<"Tickets", 'String'>
    readonly qr_code: FieldRef<"Tickets", 'String'>
    readonly barcode: FieldRef<"Tickets", 'String'>
    readonly ticket_type: FieldRef<"Tickets", 'String'>
    readonly price: FieldRef<"Tickets", 'Decimal'>
    readonly status: FieldRef<"Tickets", 'TicketStatus'>
    readonly used_at: FieldRef<"Tickets", 'DateTime'>
    readonly created_at: FieldRef<"Tickets", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tickets findUnique
   */
  export type TicketsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where: TicketsWhereUniqueInput
  }

  /**
   * Tickets findUniqueOrThrow
   */
  export type TicketsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where: TicketsWhereUniqueInput
  }

  /**
   * Tickets findFirst
   */
  export type TicketsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketsOrderByWithRelationInput | TicketsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketsScalarFieldEnum | TicketsScalarFieldEnum[]
  }

  /**
   * Tickets findFirstOrThrow
   */
  export type TicketsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketsOrderByWithRelationInput | TicketsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketsScalarFieldEnum | TicketsScalarFieldEnum[]
  }

  /**
   * Tickets findMany
   */
  export type TicketsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketsOrderByWithRelationInput | TicketsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketsScalarFieldEnum | TicketsScalarFieldEnum[]
  }

  /**
   * Tickets create
   */
  export type TicketsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * The data needed to create a Tickets.
     */
    data: XOR<TicketsCreateInput, TicketsUncheckedCreateInput>
  }

  /**
   * Tickets createMany
   */
  export type TicketsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketsCreateManyInput | TicketsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tickets createManyAndReturn
   */
  export type TicketsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketsCreateManyInput | TicketsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tickets update
   */
  export type TicketsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * The data needed to update a Tickets.
     */
    data: XOR<TicketsUpdateInput, TicketsUncheckedUpdateInput>
    /**
     * Choose, which Tickets to update.
     */
    where: TicketsWhereUniqueInput
  }

  /**
   * Tickets updateMany
   */
  export type TicketsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketsUpdateManyMutationInput, TicketsUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketsWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Tickets updateManyAndReturn
   */
  export type TicketsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketsUpdateManyMutationInput, TicketsUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketsWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tickets upsert
   */
  export type TicketsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * The filter to search for the Tickets to update in case it exists.
     */
    where: TicketsWhereUniqueInput
    /**
     * In case the Tickets found by the `where` argument doesn't exist, create a new Tickets with this data.
     */
    create: XOR<TicketsCreateInput, TicketsUncheckedCreateInput>
    /**
     * In case the Tickets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketsUpdateInput, TicketsUncheckedUpdateInput>
  }

  /**
   * Tickets delete
   */
  export type TicketsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
    /**
     * Filter which Tickets to delete.
     */
    where: TicketsWhereUniqueInput
  }

  /**
   * Tickets deleteMany
   */
  export type TicketsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketsWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Tickets without action
   */
  export type TicketsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tickets
     */
    select?: TicketsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tickets
     */
    omit?: TicketsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketsInclude<ExtArgs> | null
  }


  /**
   * Model Payments
   */

  export type AggregatePayments = {
    _count: PaymentsCountAggregateOutputType | null
    _avg: PaymentsAvgAggregateOutputType | null
    _sum: PaymentsSumAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  export type PaymentsAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentsSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentsMinAggregateOutputType = {
    id: string | null
    booking_id: string | null
    amount: Decimal | null
    payment_method: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    transaction_id: string | null
    provider_transaction_id: string | null
    payment_url: string | null
    paid_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PaymentsMaxAggregateOutputType = {
    id: string | null
    booking_id: string | null
    amount: Decimal | null
    payment_method: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    transaction_id: string | null
    provider_transaction_id: string | null
    payment_url: string | null
    paid_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PaymentsCountAggregateOutputType = {
    id: number
    booking_id: number
    amount: number
    payment_method: number
    status: number
    transaction_id: number
    provider_transaction_id: number
    payment_url: number
    paid_at: number
    metadata: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PaymentsAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentsSumAggregateInputType = {
    amount?: true
  }

  export type PaymentsMinAggregateInputType = {
    id?: true
    booking_id?: true
    amount?: true
    payment_method?: true
    status?: true
    transaction_id?: true
    provider_transaction_id?: true
    payment_url?: true
    paid_at?: true
    created_at?: true
    updated_at?: true
  }

  export type PaymentsMaxAggregateInputType = {
    id?: true
    booking_id?: true
    amount?: true
    payment_method?: true
    status?: true
    transaction_id?: true
    provider_transaction_id?: true
    payment_url?: true
    paid_at?: true
    created_at?: true
    updated_at?: true
  }

  export type PaymentsCountAggregateInputType = {
    id?: true
    booking_id?: true
    amount?: true
    payment_method?: true
    status?: true
    transaction_id?: true
    provider_transaction_id?: true
    payment_url?: true
    paid_at?: true
    metadata?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PaymentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to aggregate.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentsMaxAggregateInputType
  }

  export type GetPaymentsAggregateType<T extends PaymentsAggregateArgs> = {
        [P in keyof T & keyof AggregatePayments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayments[P]>
      : GetScalarType<T[P], AggregatePayments[P]>
  }




  export type PaymentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentsWhereInput
    orderBy?: PaymentsOrderByWithAggregationInput | PaymentsOrderByWithAggregationInput[]
    by: PaymentsScalarFieldEnum[] | PaymentsScalarFieldEnum
    having?: PaymentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentsCountAggregateInputType | true
    _avg?: PaymentsAvgAggregateInputType
    _sum?: PaymentsSumAggregateInputType
    _min?: PaymentsMinAggregateInputType
    _max?: PaymentsMaxAggregateInputType
  }

  export type PaymentsGroupByOutputType = {
    id: string
    booking_id: string
    amount: Decimal
    payment_method: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    transaction_id: string | null
    provider_transaction_id: string | null
    payment_url: string | null
    paid_at: Date | null
    metadata: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: PaymentsCountAggregateOutputType | null
    _avg: PaymentsAvgAggregateOutputType | null
    _sum: PaymentsSumAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  type GetPaymentsGroupByPayload<T extends PaymentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
        }
      >
    >


  export type PaymentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    amount?: boolean
    payment_method?: boolean
    status?: boolean
    transaction_id?: boolean
    provider_transaction_id?: boolean
    payment_url?: boolean
    paid_at?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    refunds?: boolean | Payments$refundsArgs<ExtArgs>
    _count?: boolean | PaymentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    amount?: boolean
    payment_method?: boolean
    status?: boolean
    transaction_id?: boolean
    provider_transaction_id?: boolean
    payment_url?: boolean
    paid_at?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    amount?: boolean
    payment_method?: boolean
    status?: boolean
    transaction_id?: boolean
    provider_transaction_id?: boolean
    payment_url?: boolean
    paid_at?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectScalar = {
    id?: boolean
    booking_id?: boolean
    amount?: boolean
    payment_method?: boolean
    status?: boolean
    transaction_id?: boolean
    provider_transaction_id?: boolean
    payment_url?: boolean
    paid_at?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PaymentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "amount" | "payment_method" | "status" | "transaction_id" | "provider_transaction_id" | "payment_url" | "paid_at" | "metadata" | "created_at" | "updated_at", ExtArgs["result"]["payments"]>
  export type PaymentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    refunds?: boolean | Payments$refundsArgs<ExtArgs>
    _count?: boolean | PaymentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }
  export type PaymentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
  }

  export type $PaymentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payments"
    objects: {
      booking: Prisma.$BookingsPayload<ExtArgs>
      refunds: Prisma.$RefundsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_id: string
      amount: Prisma.Decimal
      payment_method: $Enums.PaymentMethod
      status: $Enums.PaymentStatus
      transaction_id: string | null
      provider_transaction_id: string | null
      payment_url: string | null
      paid_at: Date | null
      metadata: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["payments"]>
    composites: {}
  }

  type PaymentsGetPayload<S extends boolean | null | undefined | PaymentsDefaultArgs> = $Result.GetResult<Prisma.$PaymentsPayload, S>

  type PaymentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentsCountAggregateInputType | true
    }

  export interface PaymentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payments'], meta: { name: 'Payments' } }
    /**
     * Find zero or one Payments that matches the filter.
     * @param {PaymentsFindUniqueArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentsFindUniqueArgs>(args: SelectSubset<T, PaymentsFindUniqueArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentsFindUniqueOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentsFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindFirstArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentsFindFirstArgs>(args?: SelectSubset<T, PaymentsFindFirstArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindFirstOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentsFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payments.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentsWithIdOnly = await prisma.payments.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentsFindManyArgs>(args?: SelectSubset<T, PaymentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payments.
     * @param {PaymentsCreateArgs} args - Arguments to create a Payments.
     * @example
     * // Create one Payments
     * const Payments = await prisma.payments.create({
     *   data: {
     *     // ... data to create a Payments
     *   }
     * })
     * 
     */
    create<T extends PaymentsCreateArgs>(args: SelectSubset<T, PaymentsCreateArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentsCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payments = await prisma.payments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentsCreateManyArgs>(args?: SelectSubset<T, PaymentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentsCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payments = await prisma.payments.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentsWithIdOnly = await prisma.payments.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentsCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payments.
     * @param {PaymentsDeleteArgs} args - Arguments to delete one Payments.
     * @example
     * // Delete one Payments
     * const Payments = await prisma.payments.delete({
     *   where: {
     *     // ... filter to delete one Payments
     *   }
     * })
     * 
     */
    delete<T extends PaymentsDeleteArgs>(args: SelectSubset<T, PaymentsDeleteArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payments.
     * @param {PaymentsUpdateArgs} args - Arguments to update one Payments.
     * @example
     * // Update one Payments
     * const payments = await prisma.payments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentsUpdateArgs>(args: SelectSubset<T, PaymentsUpdateArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentsDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentsDeleteManyArgs>(args?: SelectSubset<T, PaymentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payments = await prisma.payments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentsUpdateManyArgs>(args: SelectSubset<T, PaymentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentsUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payments = await prisma.payments.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentsWithIdOnly = await prisma.payments.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentsUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payments.
     * @param {PaymentsUpsertArgs} args - Arguments to update or create a Payments.
     * @example
     * // Update or create a Payments
     * const payments = await prisma.payments.upsert({
     *   create: {
     *     // ... data to create a Payments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payments we want to update
     *   }
     * })
     */
    upsert<T extends PaymentsUpsertArgs>(args: SelectSubset<T, PaymentsUpsertArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payments.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentsCountArgs>(
      args?: Subset<T, PaymentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentsAggregateArgs>(args: Subset<T, PaymentsAggregateArgs>): Prisma.PrismaPromise<GetPaymentsAggregateType<T>>

    /**
     * Group by Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentsGroupByArgs['orderBy'] }
        : { orderBy?: PaymentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payments model
   */
  readonly fields: PaymentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingsDefaultArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    refunds<T extends Payments$refundsArgs<ExtArgs> = {}>(args?: Subset<T, Payments$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payments model
   */
  interface PaymentsFieldRefs {
    readonly id: FieldRef<"Payments", 'String'>
    readonly booking_id: FieldRef<"Payments", 'String'>
    readonly amount: FieldRef<"Payments", 'Decimal'>
    readonly payment_method: FieldRef<"Payments", 'PaymentMethod'>
    readonly status: FieldRef<"Payments", 'PaymentStatus'>
    readonly transaction_id: FieldRef<"Payments", 'String'>
    readonly provider_transaction_id: FieldRef<"Payments", 'String'>
    readonly payment_url: FieldRef<"Payments", 'String'>
    readonly paid_at: FieldRef<"Payments", 'DateTime'>
    readonly metadata: FieldRef<"Payments", 'Json'>
    readonly created_at: FieldRef<"Payments", 'DateTime'>
    readonly updated_at: FieldRef<"Payments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payments findUnique
   */
  export type PaymentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments findUniqueOrThrow
   */
  export type PaymentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments findFirst
   */
  export type PaymentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments findFirstOrThrow
   */
  export type PaymentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments findMany
   */
  export type PaymentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments create
   */
  export type PaymentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The data needed to create a Payments.
     */
    data: XOR<PaymentsCreateInput, PaymentsUncheckedCreateInput>
  }

  /**
   * Payments createMany
   */
  export type PaymentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentsCreateManyInput | PaymentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payments createManyAndReturn
   */
  export type PaymentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentsCreateManyInput | PaymentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payments update
   */
  export type PaymentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The data needed to update a Payments.
     */
    data: XOR<PaymentsUpdateInput, PaymentsUncheckedUpdateInput>
    /**
     * Choose, which Payments to update.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments updateMany
   */
  export type PaymentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payments updateManyAndReturn
   */
  export type PaymentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payments upsert
   */
  export type PaymentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The filter to search for the Payments to update in case it exists.
     */
    where: PaymentsWhereUniqueInput
    /**
     * In case the Payments found by the `where` argument doesn't exist, create a new Payments with this data.
     */
    create: XOR<PaymentsCreateInput, PaymentsUncheckedCreateInput>
    /**
     * In case the Payments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentsUpdateInput, PaymentsUncheckedUpdateInput>
  }

  /**
   * Payments delete
   */
  export type PaymentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter which Payments to delete.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments deleteMany
   */
  export type PaymentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payments.refunds
   */
  export type Payments$refundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    where?: RefundsWhereInput
    orderBy?: RefundsOrderByWithRelationInput | RefundsOrderByWithRelationInput[]
    cursor?: RefundsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundsScalarFieldEnum | RefundsScalarFieldEnum[]
  }

  /**
   * Payments without action
   */
  export type PaymentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
  }


  /**
   * Model Refunds
   */

  export type AggregateRefunds = {
    _count: RefundsCountAggregateOutputType | null
    _avg: RefundsAvgAggregateOutputType | null
    _sum: RefundsSumAggregateOutputType | null
    _min: RefundsMinAggregateOutputType | null
    _max: RefundsMaxAggregateOutputType | null
  }

  export type RefundsAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type RefundsSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type RefundsMinAggregateOutputType = {
    id: string | null
    payment_id: string | null
    amount: Decimal | null
    reason: string | null
    status: $Enums.RefundStatus | null
    refunded_at: Date | null
    created_at: Date | null
  }

  export type RefundsMaxAggregateOutputType = {
    id: string | null
    payment_id: string | null
    amount: Decimal | null
    reason: string | null
    status: $Enums.RefundStatus | null
    refunded_at: Date | null
    created_at: Date | null
  }

  export type RefundsCountAggregateOutputType = {
    id: number
    payment_id: number
    amount: number
    reason: number
    status: number
    refunded_at: number
    created_at: number
    _all: number
  }


  export type RefundsAvgAggregateInputType = {
    amount?: true
  }

  export type RefundsSumAggregateInputType = {
    amount?: true
  }

  export type RefundsMinAggregateInputType = {
    id?: true
    payment_id?: true
    amount?: true
    reason?: true
    status?: true
    refunded_at?: true
    created_at?: true
  }

  export type RefundsMaxAggregateInputType = {
    id?: true
    payment_id?: true
    amount?: true
    reason?: true
    status?: true
    refunded_at?: true
    created_at?: true
  }

  export type RefundsCountAggregateInputType = {
    id?: true
    payment_id?: true
    amount?: true
    reason?: true
    status?: true
    refunded_at?: true
    created_at?: true
    _all?: true
  }

  export type RefundsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refunds to aggregate.
     */
    where?: RefundsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundsOrderByWithRelationInput | RefundsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefundsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Refunds
    **/
    _count?: true | RefundsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefundsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefundsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefundsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefundsMaxAggregateInputType
  }

  export type GetRefundsAggregateType<T extends RefundsAggregateArgs> = {
        [P in keyof T & keyof AggregateRefunds]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefunds[P]>
      : GetScalarType<T[P], AggregateRefunds[P]>
  }




  export type RefundsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundsWhereInput
    orderBy?: RefundsOrderByWithAggregationInput | RefundsOrderByWithAggregationInput[]
    by: RefundsScalarFieldEnum[] | RefundsScalarFieldEnum
    having?: RefundsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefundsCountAggregateInputType | true
    _avg?: RefundsAvgAggregateInputType
    _sum?: RefundsSumAggregateInputType
    _min?: RefundsMinAggregateInputType
    _max?: RefundsMaxAggregateInputType
  }

  export type RefundsGroupByOutputType = {
    id: string
    payment_id: string
    amount: Decimal
    reason: string
    status: $Enums.RefundStatus
    refunded_at: Date | null
    created_at: Date
    _count: RefundsCountAggregateOutputType | null
    _avg: RefundsAvgAggregateOutputType | null
    _sum: RefundsSumAggregateOutputType | null
    _min: RefundsMinAggregateOutputType | null
    _max: RefundsMaxAggregateOutputType | null
  }

  type GetRefundsGroupByPayload<T extends RefundsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefundsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefundsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefundsGroupByOutputType[P]>
            : GetScalarType<T[P], RefundsGroupByOutputType[P]>
        }
      >
    >


  export type RefundsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payment_id?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    refunded_at?: boolean
    created_at?: boolean
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refunds"]>

  export type RefundsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payment_id?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    refunded_at?: boolean
    created_at?: boolean
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refunds"]>

  export type RefundsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payment_id?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    refunded_at?: boolean
    created_at?: boolean
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refunds"]>

  export type RefundsSelectScalar = {
    id?: boolean
    payment_id?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    refunded_at?: boolean
    created_at?: boolean
  }

  export type RefundsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "payment_id" | "amount" | "reason" | "status" | "refunded_at" | "created_at", ExtArgs["result"]["refunds"]>
  export type RefundsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }
  export type RefundsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }
  export type RefundsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentsDefaultArgs<ExtArgs>
  }

  export type $RefundsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Refunds"
    objects: {
      payment: Prisma.$PaymentsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payment_id: string
      amount: Prisma.Decimal
      reason: string
      status: $Enums.RefundStatus
      refunded_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["refunds"]>
    composites: {}
  }

  type RefundsGetPayload<S extends boolean | null | undefined | RefundsDefaultArgs> = $Result.GetResult<Prisma.$RefundsPayload, S>

  type RefundsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefundsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefundsCountAggregateInputType | true
    }

  export interface RefundsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Refunds'], meta: { name: 'Refunds' } }
    /**
     * Find zero or one Refunds that matches the filter.
     * @param {RefundsFindUniqueArgs} args - Arguments to find a Refunds
     * @example
     * // Get one Refunds
     * const refunds = await prisma.refunds.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefundsFindUniqueArgs>(args: SelectSubset<T, RefundsFindUniqueArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Refunds that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefundsFindUniqueOrThrowArgs} args - Arguments to find a Refunds
     * @example
     * // Get one Refunds
     * const refunds = await prisma.refunds.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefundsFindUniqueOrThrowArgs>(args: SelectSubset<T, RefundsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refunds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsFindFirstArgs} args - Arguments to find a Refunds
     * @example
     * // Get one Refunds
     * const refunds = await prisma.refunds.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefundsFindFirstArgs>(args?: SelectSubset<T, RefundsFindFirstArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refunds that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsFindFirstOrThrowArgs} args - Arguments to find a Refunds
     * @example
     * // Get one Refunds
     * const refunds = await prisma.refunds.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefundsFindFirstOrThrowArgs>(args?: SelectSubset<T, RefundsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Refunds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Refunds
     * const refunds = await prisma.refunds.findMany()
     * 
     * // Get first 10 Refunds
     * const refunds = await prisma.refunds.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refundsWithIdOnly = await prisma.refunds.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefundsFindManyArgs>(args?: SelectSubset<T, RefundsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Refunds.
     * @param {RefundsCreateArgs} args - Arguments to create a Refunds.
     * @example
     * // Create one Refunds
     * const Refunds = await prisma.refunds.create({
     *   data: {
     *     // ... data to create a Refunds
     *   }
     * })
     * 
     */
    create<T extends RefundsCreateArgs>(args: SelectSubset<T, RefundsCreateArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Refunds.
     * @param {RefundsCreateManyArgs} args - Arguments to create many Refunds.
     * @example
     * // Create many Refunds
     * const refunds = await prisma.refunds.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefundsCreateManyArgs>(args?: SelectSubset<T, RefundsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Refunds and returns the data saved in the database.
     * @param {RefundsCreateManyAndReturnArgs} args - Arguments to create many Refunds.
     * @example
     * // Create many Refunds
     * const refunds = await prisma.refunds.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Refunds and only return the `id`
     * const refundsWithIdOnly = await prisma.refunds.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefundsCreateManyAndReturnArgs>(args?: SelectSubset<T, RefundsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Refunds.
     * @param {RefundsDeleteArgs} args - Arguments to delete one Refunds.
     * @example
     * // Delete one Refunds
     * const Refunds = await prisma.refunds.delete({
     *   where: {
     *     // ... filter to delete one Refunds
     *   }
     * })
     * 
     */
    delete<T extends RefundsDeleteArgs>(args: SelectSubset<T, RefundsDeleteArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Refunds.
     * @param {RefundsUpdateArgs} args - Arguments to update one Refunds.
     * @example
     * // Update one Refunds
     * const refunds = await prisma.refunds.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefundsUpdateArgs>(args: SelectSubset<T, RefundsUpdateArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Refunds.
     * @param {RefundsDeleteManyArgs} args - Arguments to filter Refunds to delete.
     * @example
     * // Delete a few Refunds
     * const { count } = await prisma.refunds.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefundsDeleteManyArgs>(args?: SelectSubset<T, RefundsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Refunds
     * const refunds = await prisma.refunds.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefundsUpdateManyArgs>(args: SelectSubset<T, RefundsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refunds and returns the data updated in the database.
     * @param {RefundsUpdateManyAndReturnArgs} args - Arguments to update many Refunds.
     * @example
     * // Update many Refunds
     * const refunds = await prisma.refunds.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Refunds and only return the `id`
     * const refundsWithIdOnly = await prisma.refunds.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefundsUpdateManyAndReturnArgs>(args: SelectSubset<T, RefundsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Refunds.
     * @param {RefundsUpsertArgs} args - Arguments to update or create a Refunds.
     * @example
     * // Update or create a Refunds
     * const refunds = await prisma.refunds.upsert({
     *   create: {
     *     // ... data to create a Refunds
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Refunds we want to update
     *   }
     * })
     */
    upsert<T extends RefundsUpsertArgs>(args: SelectSubset<T, RefundsUpsertArgs<ExtArgs>>): Prisma__RefundsClient<$Result.GetResult<Prisma.$RefundsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsCountArgs} args - Arguments to filter Refunds to count.
     * @example
     * // Count the number of Refunds
     * const count = await prisma.refunds.count({
     *   where: {
     *     // ... the filter for the Refunds we want to count
     *   }
     * })
    **/
    count<T extends RefundsCountArgs>(
      args?: Subset<T, RefundsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefundsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefundsAggregateArgs>(args: Subset<T, RefundsAggregateArgs>): Prisma.PrismaPromise<GetRefundsAggregateType<T>>

    /**
     * Group by Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefundsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefundsGroupByArgs['orderBy'] }
        : { orderBy?: RefundsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefundsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Refunds model
   */
  readonly fields: RefundsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Refunds.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefundsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends PaymentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentsDefaultArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Refunds model
   */
  interface RefundsFieldRefs {
    readonly id: FieldRef<"Refunds", 'String'>
    readonly payment_id: FieldRef<"Refunds", 'String'>
    readonly amount: FieldRef<"Refunds", 'Decimal'>
    readonly reason: FieldRef<"Refunds", 'String'>
    readonly status: FieldRef<"Refunds", 'RefundStatus'>
    readonly refunded_at: FieldRef<"Refunds", 'DateTime'>
    readonly created_at: FieldRef<"Refunds", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Refunds findUnique
   */
  export type RefundsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where: RefundsWhereUniqueInput
  }

  /**
   * Refunds findUniqueOrThrow
   */
  export type RefundsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where: RefundsWhereUniqueInput
  }

  /**
   * Refunds findFirst
   */
  export type RefundsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where?: RefundsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundsOrderByWithRelationInput | RefundsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refunds.
     */
    cursor?: RefundsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refunds.
     */
    distinct?: RefundsScalarFieldEnum | RefundsScalarFieldEnum[]
  }

  /**
   * Refunds findFirstOrThrow
   */
  export type RefundsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where?: RefundsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundsOrderByWithRelationInput | RefundsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refunds.
     */
    cursor?: RefundsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refunds.
     */
    distinct?: RefundsScalarFieldEnum | RefundsScalarFieldEnum[]
  }

  /**
   * Refunds findMany
   */
  export type RefundsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where?: RefundsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundsOrderByWithRelationInput | RefundsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Refunds.
     */
    cursor?: RefundsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    distinct?: RefundsScalarFieldEnum | RefundsScalarFieldEnum[]
  }

  /**
   * Refunds create
   */
  export type RefundsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * The data needed to create a Refunds.
     */
    data: XOR<RefundsCreateInput, RefundsUncheckedCreateInput>
  }

  /**
   * Refunds createMany
   */
  export type RefundsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Refunds.
     */
    data: RefundsCreateManyInput | RefundsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Refunds createManyAndReturn
   */
  export type RefundsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * The data used to create many Refunds.
     */
    data: RefundsCreateManyInput | RefundsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refunds update
   */
  export type RefundsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * The data needed to update a Refunds.
     */
    data: XOR<RefundsUpdateInput, RefundsUncheckedUpdateInput>
    /**
     * Choose, which Refunds to update.
     */
    where: RefundsWhereUniqueInput
  }

  /**
   * Refunds updateMany
   */
  export type RefundsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Refunds.
     */
    data: XOR<RefundsUpdateManyMutationInput, RefundsUncheckedUpdateManyInput>
    /**
     * Filter which Refunds to update
     */
    where?: RefundsWhereInput
    /**
     * Limit how many Refunds to update.
     */
    limit?: number
  }

  /**
   * Refunds updateManyAndReturn
   */
  export type RefundsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * The data used to update Refunds.
     */
    data: XOR<RefundsUpdateManyMutationInput, RefundsUncheckedUpdateManyInput>
    /**
     * Filter which Refunds to update
     */
    where?: RefundsWhereInput
    /**
     * Limit how many Refunds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refunds upsert
   */
  export type RefundsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * The filter to search for the Refunds to update in case it exists.
     */
    where: RefundsWhereUniqueInput
    /**
     * In case the Refunds found by the `where` argument doesn't exist, create a new Refunds with this data.
     */
    create: XOR<RefundsCreateInput, RefundsUncheckedCreateInput>
    /**
     * In case the Refunds was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefundsUpdateInput, RefundsUncheckedUpdateInput>
  }

  /**
   * Refunds delete
   */
  export type RefundsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
    /**
     * Filter which Refunds to delete.
     */
    where: RefundsWhereUniqueInput
  }

  /**
   * Refunds deleteMany
   */
  export type RefundsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refunds to delete
     */
    where?: RefundsWhereInput
    /**
     * Limit how many Refunds to delete.
     */
    limit?: number
  }

  /**
   * Refunds without action
   */
  export type RefundsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refunds
     */
    select?: RefundsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refunds
     */
    omit?: RefundsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundsInclude<ExtArgs> | null
  }


  /**
   * Model Concessions
   */

  export type AggregateConcessions = {
    _count: ConcessionsCountAggregateOutputType | null
    _avg: ConcessionsAvgAggregateOutputType | null
    _sum: ConcessionsSumAggregateOutputType | null
    _min: ConcessionsMinAggregateOutputType | null
    _max: ConcessionsMaxAggregateOutputType | null
  }

  export type ConcessionsAvgAggregateOutputType = {
    price: Decimal | null
    inventory: number | null
  }

  export type ConcessionsSumAggregateOutputType = {
    price: Decimal | null
    inventory: number | null
  }

  export type ConcessionsMinAggregateOutputType = {
    id: string | null
    name: string | null
    name_en: string | null
    description: string | null
    category: $Enums.ConcessionCategory | null
    price: Decimal | null
    image_url: string | null
    available: boolean | null
    inventory: number | null
    cinema_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConcessionsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    name_en: string | null
    description: string | null
    category: $Enums.ConcessionCategory | null
    price: Decimal | null
    image_url: string | null
    available: boolean | null
    inventory: number | null
    cinema_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConcessionsCountAggregateOutputType = {
    id: number
    name: number
    name_en: number
    description: number
    category: number
    price: number
    image_url: number
    available: number
    inventory: number
    cinema_id: number
    nutrition_info: number
    allergens: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ConcessionsAvgAggregateInputType = {
    price?: true
    inventory?: true
  }

  export type ConcessionsSumAggregateInputType = {
    price?: true
    inventory?: true
  }

  export type ConcessionsMinAggregateInputType = {
    id?: true
    name?: true
    name_en?: true
    description?: true
    category?: true
    price?: true
    image_url?: true
    available?: true
    inventory?: true
    cinema_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ConcessionsMaxAggregateInputType = {
    id?: true
    name?: true
    name_en?: true
    description?: true
    category?: true
    price?: true
    image_url?: true
    available?: true
    inventory?: true
    cinema_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ConcessionsCountAggregateInputType = {
    id?: true
    name?: true
    name_en?: true
    description?: true
    category?: true
    price?: true
    image_url?: true
    available?: true
    inventory?: true
    cinema_id?: true
    nutrition_info?: true
    allergens?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ConcessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concessions to aggregate.
     */
    where?: ConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionsOrderByWithRelationInput | ConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Concessions
    **/
    _count?: true | ConcessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConcessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConcessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConcessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConcessionsMaxAggregateInputType
  }

  export type GetConcessionsAggregateType<T extends ConcessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateConcessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcessions[P]>
      : GetScalarType<T[P], AggregateConcessions[P]>
  }




  export type ConcessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionsWhereInput
    orderBy?: ConcessionsOrderByWithAggregationInput | ConcessionsOrderByWithAggregationInput[]
    by: ConcessionsScalarFieldEnum[] | ConcessionsScalarFieldEnum
    having?: ConcessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConcessionsCountAggregateInputType | true
    _avg?: ConcessionsAvgAggregateInputType
    _sum?: ConcessionsSumAggregateInputType
    _min?: ConcessionsMinAggregateInputType
    _max?: ConcessionsMaxAggregateInputType
  }

  export type ConcessionsGroupByOutputType = {
    id: string
    name: string
    name_en: string | null
    description: string | null
    category: $Enums.ConcessionCategory
    price: Decimal
    image_url: string | null
    available: boolean
    inventory: number | null
    cinema_id: string | null
    nutrition_info: JsonValue | null
    allergens: string[]
    created_at: Date
    updated_at: Date
    _count: ConcessionsCountAggregateOutputType | null
    _avg: ConcessionsAvgAggregateOutputType | null
    _sum: ConcessionsSumAggregateOutputType | null
    _min: ConcessionsMinAggregateOutputType | null
    _max: ConcessionsMaxAggregateOutputType | null
  }

  type GetConcessionsGroupByPayload<T extends ConcessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConcessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConcessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcessionsGroupByOutputType[P]>
            : GetScalarType<T[P], ConcessionsGroupByOutputType[P]>
        }
      >
    >


  export type ConcessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    name_en?: boolean
    description?: boolean
    category?: boolean
    price?: boolean
    image_url?: boolean
    available?: boolean
    inventory?: boolean
    cinema_id?: boolean
    nutrition_info?: boolean
    allergens?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking_concessions?: boolean | Concessions$booking_concessionsArgs<ExtArgs>
    _count?: boolean | ConcessionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessions"]>

  export type ConcessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    name_en?: boolean
    description?: boolean
    category?: boolean
    price?: boolean
    image_url?: boolean
    available?: boolean
    inventory?: boolean
    cinema_id?: boolean
    nutrition_info?: boolean
    allergens?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["concessions"]>

  export type ConcessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    name_en?: boolean
    description?: boolean
    category?: boolean
    price?: boolean
    image_url?: boolean
    available?: boolean
    inventory?: boolean
    cinema_id?: boolean
    nutrition_info?: boolean
    allergens?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["concessions"]>

  export type ConcessionsSelectScalar = {
    id?: boolean
    name?: boolean
    name_en?: boolean
    description?: boolean
    category?: boolean
    price?: boolean
    image_url?: boolean
    available?: boolean
    inventory?: boolean
    cinema_id?: boolean
    nutrition_info?: boolean
    allergens?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ConcessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "name_en" | "description" | "category" | "price" | "image_url" | "available" | "inventory" | "cinema_id" | "nutrition_info" | "allergens" | "created_at" | "updated_at", ExtArgs["result"]["concessions"]>
  export type ConcessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_concessions?: boolean | Concessions$booking_concessionsArgs<ExtArgs>
    _count?: boolean | ConcessionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConcessionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConcessionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConcessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Concessions"
    objects: {
      booking_concessions: Prisma.$BookingConcessionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      name_en: string | null
      description: string | null
      category: $Enums.ConcessionCategory
      price: Prisma.Decimal
      image_url: string | null
      available: boolean
      inventory: number | null
      cinema_id: string | null
      nutrition_info: Prisma.JsonValue | null
      allergens: string[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["concessions"]>
    composites: {}
  }

  type ConcessionsGetPayload<S extends boolean | null | undefined | ConcessionsDefaultArgs> = $Result.GetResult<Prisma.$ConcessionsPayload, S>

  type ConcessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConcessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConcessionsCountAggregateInputType | true
    }

  export interface ConcessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Concessions'], meta: { name: 'Concessions' } }
    /**
     * Find zero or one Concessions that matches the filter.
     * @param {ConcessionsFindUniqueArgs} args - Arguments to find a Concessions
     * @example
     * // Get one Concessions
     * const concessions = await prisma.concessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcessionsFindUniqueArgs>(args: SelectSubset<T, ConcessionsFindUniqueArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Concessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcessionsFindUniqueOrThrowArgs} args - Arguments to find a Concessions
     * @example
     * // Get one Concessions
     * const concessions = await prisma.concessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, ConcessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsFindFirstArgs} args - Arguments to find a Concessions
     * @example
     * // Get one Concessions
     * const concessions = await prisma.concessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcessionsFindFirstArgs>(args?: SelectSubset<T, ConcessionsFindFirstArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsFindFirstOrThrowArgs} args - Arguments to find a Concessions
     * @example
     * // Get one Concessions
     * const concessions = await prisma.concessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, ConcessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Concessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Concessions
     * const concessions = await prisma.concessions.findMany()
     * 
     * // Get first 10 Concessions
     * const concessions = await prisma.concessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const concessionsWithIdOnly = await prisma.concessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConcessionsFindManyArgs>(args?: SelectSubset<T, ConcessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Concessions.
     * @param {ConcessionsCreateArgs} args - Arguments to create a Concessions.
     * @example
     * // Create one Concessions
     * const Concessions = await prisma.concessions.create({
     *   data: {
     *     // ... data to create a Concessions
     *   }
     * })
     * 
     */
    create<T extends ConcessionsCreateArgs>(args: SelectSubset<T, ConcessionsCreateArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Concessions.
     * @param {ConcessionsCreateManyArgs} args - Arguments to create many Concessions.
     * @example
     * // Create many Concessions
     * const concessions = await prisma.concessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConcessionsCreateManyArgs>(args?: SelectSubset<T, ConcessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Concessions and returns the data saved in the database.
     * @param {ConcessionsCreateManyAndReturnArgs} args - Arguments to create many Concessions.
     * @example
     * // Create many Concessions
     * const concessions = await prisma.concessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Concessions and only return the `id`
     * const concessionsWithIdOnly = await prisma.concessions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConcessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, ConcessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Concessions.
     * @param {ConcessionsDeleteArgs} args - Arguments to delete one Concessions.
     * @example
     * // Delete one Concessions
     * const Concessions = await prisma.concessions.delete({
     *   where: {
     *     // ... filter to delete one Concessions
     *   }
     * })
     * 
     */
    delete<T extends ConcessionsDeleteArgs>(args: SelectSubset<T, ConcessionsDeleteArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Concessions.
     * @param {ConcessionsUpdateArgs} args - Arguments to update one Concessions.
     * @example
     * // Update one Concessions
     * const concessions = await prisma.concessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConcessionsUpdateArgs>(args: SelectSubset<T, ConcessionsUpdateArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Concessions.
     * @param {ConcessionsDeleteManyArgs} args - Arguments to filter Concessions to delete.
     * @example
     * // Delete a few Concessions
     * const { count } = await prisma.concessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConcessionsDeleteManyArgs>(args?: SelectSubset<T, ConcessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Concessions
     * const concessions = await prisma.concessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConcessionsUpdateManyArgs>(args: SelectSubset<T, ConcessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concessions and returns the data updated in the database.
     * @param {ConcessionsUpdateManyAndReturnArgs} args - Arguments to update many Concessions.
     * @example
     * // Update many Concessions
     * const concessions = await prisma.concessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Concessions and only return the `id`
     * const concessionsWithIdOnly = await prisma.concessions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConcessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, ConcessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Concessions.
     * @param {ConcessionsUpsertArgs} args - Arguments to update or create a Concessions.
     * @example
     * // Update or create a Concessions
     * const concessions = await prisma.concessions.upsert({
     *   create: {
     *     // ... data to create a Concessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Concessions we want to update
     *   }
     * })
     */
    upsert<T extends ConcessionsUpsertArgs>(args: SelectSubset<T, ConcessionsUpsertArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsCountArgs} args - Arguments to filter Concessions to count.
     * @example
     * // Count the number of Concessions
     * const count = await prisma.concessions.count({
     *   where: {
     *     // ... the filter for the Concessions we want to count
     *   }
     * })
    **/
    count<T extends ConcessionsCountArgs>(
      args?: Subset<T, ConcessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConcessionsAggregateArgs>(args: Subset<T, ConcessionsAggregateArgs>): Prisma.PrismaPromise<GetConcessionsAggregateType<T>>

    /**
     * Group by Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConcessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcessionsGroupByArgs['orderBy'] }
        : { orderBy?: ConcessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConcessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConcessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Concessions model
   */
  readonly fields: ConcessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Concessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking_concessions<T extends Concessions$booking_concessionsArgs<ExtArgs> = {}>(args?: Subset<T, Concessions$booking_concessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Concessions model
   */
  interface ConcessionsFieldRefs {
    readonly id: FieldRef<"Concessions", 'String'>
    readonly name: FieldRef<"Concessions", 'String'>
    readonly name_en: FieldRef<"Concessions", 'String'>
    readonly description: FieldRef<"Concessions", 'String'>
    readonly category: FieldRef<"Concessions", 'ConcessionCategory'>
    readonly price: FieldRef<"Concessions", 'Decimal'>
    readonly image_url: FieldRef<"Concessions", 'String'>
    readonly available: FieldRef<"Concessions", 'Boolean'>
    readonly inventory: FieldRef<"Concessions", 'Int'>
    readonly cinema_id: FieldRef<"Concessions", 'String'>
    readonly nutrition_info: FieldRef<"Concessions", 'Json'>
    readonly allergens: FieldRef<"Concessions", 'String[]'>
    readonly created_at: FieldRef<"Concessions", 'DateTime'>
    readonly updated_at: FieldRef<"Concessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Concessions findUnique
   */
  export type ConcessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where: ConcessionsWhereUniqueInput
  }

  /**
   * Concessions findUniqueOrThrow
   */
  export type ConcessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where: ConcessionsWhereUniqueInput
  }

  /**
   * Concessions findFirst
   */
  export type ConcessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where?: ConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionsOrderByWithRelationInput | ConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concessions.
     */
    cursor?: ConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concessions.
     */
    distinct?: ConcessionsScalarFieldEnum | ConcessionsScalarFieldEnum[]
  }

  /**
   * Concessions findFirstOrThrow
   */
  export type ConcessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where?: ConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionsOrderByWithRelationInput | ConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concessions.
     */
    cursor?: ConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concessions.
     */
    distinct?: ConcessionsScalarFieldEnum | ConcessionsScalarFieldEnum[]
  }

  /**
   * Concessions findMany
   */
  export type ConcessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where?: ConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionsOrderByWithRelationInput | ConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Concessions.
     */
    cursor?: ConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    distinct?: ConcessionsScalarFieldEnum | ConcessionsScalarFieldEnum[]
  }

  /**
   * Concessions create
   */
  export type ConcessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a Concessions.
     */
    data: XOR<ConcessionsCreateInput, ConcessionsUncheckedCreateInput>
  }

  /**
   * Concessions createMany
   */
  export type ConcessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Concessions.
     */
    data: ConcessionsCreateManyInput | ConcessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Concessions createManyAndReturn
   */
  export type ConcessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * The data used to create many Concessions.
     */
    data: ConcessionsCreateManyInput | ConcessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Concessions update
   */
  export type ConcessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a Concessions.
     */
    data: XOR<ConcessionsUpdateInput, ConcessionsUncheckedUpdateInput>
    /**
     * Choose, which Concessions to update.
     */
    where: ConcessionsWhereUniqueInput
  }

  /**
   * Concessions updateMany
   */
  export type ConcessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Concessions.
     */
    data: XOR<ConcessionsUpdateManyMutationInput, ConcessionsUncheckedUpdateManyInput>
    /**
     * Filter which Concessions to update
     */
    where?: ConcessionsWhereInput
    /**
     * Limit how many Concessions to update.
     */
    limit?: number
  }

  /**
   * Concessions updateManyAndReturn
   */
  export type ConcessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * The data used to update Concessions.
     */
    data: XOR<ConcessionsUpdateManyMutationInput, ConcessionsUncheckedUpdateManyInput>
    /**
     * Filter which Concessions to update
     */
    where?: ConcessionsWhereInput
    /**
     * Limit how many Concessions to update.
     */
    limit?: number
  }

  /**
   * Concessions upsert
   */
  export type ConcessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the Concessions to update in case it exists.
     */
    where: ConcessionsWhereUniqueInput
    /**
     * In case the Concessions found by the `where` argument doesn't exist, create a new Concessions with this data.
     */
    create: XOR<ConcessionsCreateInput, ConcessionsUncheckedCreateInput>
    /**
     * In case the Concessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcessionsUpdateInput, ConcessionsUncheckedUpdateInput>
  }

  /**
   * Concessions delete
   */
  export type ConcessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
    /**
     * Filter which Concessions to delete.
     */
    where: ConcessionsWhereUniqueInput
  }

  /**
   * Concessions deleteMany
   */
  export type ConcessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concessions to delete
     */
    where?: ConcessionsWhereInput
    /**
     * Limit how many Concessions to delete.
     */
    limit?: number
  }

  /**
   * Concessions.booking_concessions
   */
  export type Concessions$booking_concessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    where?: BookingConcessionsWhereInput
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    cursor?: BookingConcessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingConcessionsScalarFieldEnum | BookingConcessionsScalarFieldEnum[]
  }

  /**
   * Concessions without action
   */
  export type ConcessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concessions
     */
    select?: ConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concessions
     */
    omit?: ConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionsInclude<ExtArgs> | null
  }


  /**
   * Model BookingConcessions
   */

  export type AggregateBookingConcessions = {
    _count: BookingConcessionsCountAggregateOutputType | null
    _avg: BookingConcessionsAvgAggregateOutputType | null
    _sum: BookingConcessionsSumAggregateOutputType | null
    _min: BookingConcessionsMinAggregateOutputType | null
    _max: BookingConcessionsMaxAggregateOutputType | null
  }

  export type BookingConcessionsAvgAggregateOutputType = {
    quantity: number | null
    unit_price: Decimal | null
    total_price: Decimal | null
  }

  export type BookingConcessionsSumAggregateOutputType = {
    quantity: number | null
    unit_price: Decimal | null
    total_price: Decimal | null
  }

  export type BookingConcessionsMinAggregateOutputType = {
    id: string | null
    booking_id: string | null
    concession_id: string | null
    quantity: number | null
    unit_price: Decimal | null
    total_price: Decimal | null
    created_at: Date | null
  }

  export type BookingConcessionsMaxAggregateOutputType = {
    id: string | null
    booking_id: string | null
    concession_id: string | null
    quantity: number | null
    unit_price: Decimal | null
    total_price: Decimal | null
    created_at: Date | null
  }

  export type BookingConcessionsCountAggregateOutputType = {
    id: number
    booking_id: number
    concession_id: number
    quantity: number
    unit_price: number
    total_price: number
    created_at: number
    _all: number
  }


  export type BookingConcessionsAvgAggregateInputType = {
    quantity?: true
    unit_price?: true
    total_price?: true
  }

  export type BookingConcessionsSumAggregateInputType = {
    quantity?: true
    unit_price?: true
    total_price?: true
  }

  export type BookingConcessionsMinAggregateInputType = {
    id?: true
    booking_id?: true
    concession_id?: true
    quantity?: true
    unit_price?: true
    total_price?: true
    created_at?: true
  }

  export type BookingConcessionsMaxAggregateInputType = {
    id?: true
    booking_id?: true
    concession_id?: true
    quantity?: true
    unit_price?: true
    total_price?: true
    created_at?: true
  }

  export type BookingConcessionsCountAggregateInputType = {
    id?: true
    booking_id?: true
    concession_id?: true
    quantity?: true
    unit_price?: true
    total_price?: true
    created_at?: true
    _all?: true
  }

  export type BookingConcessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingConcessions to aggregate.
     */
    where?: BookingConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingConcessions to fetch.
     */
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingConcessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingConcessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingConcessions
    **/
    _count?: true | BookingConcessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingConcessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingConcessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingConcessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingConcessionsMaxAggregateInputType
  }

  export type GetBookingConcessionsAggregateType<T extends BookingConcessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingConcessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingConcessions[P]>
      : GetScalarType<T[P], AggregateBookingConcessions[P]>
  }




  export type BookingConcessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingConcessionsWhereInput
    orderBy?: BookingConcessionsOrderByWithAggregationInput | BookingConcessionsOrderByWithAggregationInput[]
    by: BookingConcessionsScalarFieldEnum[] | BookingConcessionsScalarFieldEnum
    having?: BookingConcessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingConcessionsCountAggregateInputType | true
    _avg?: BookingConcessionsAvgAggregateInputType
    _sum?: BookingConcessionsSumAggregateInputType
    _min?: BookingConcessionsMinAggregateInputType
    _max?: BookingConcessionsMaxAggregateInputType
  }

  export type BookingConcessionsGroupByOutputType = {
    id: string
    booking_id: string
    concession_id: string
    quantity: number
    unit_price: Decimal
    total_price: Decimal
    created_at: Date
    _count: BookingConcessionsCountAggregateOutputType | null
    _avg: BookingConcessionsAvgAggregateOutputType | null
    _sum: BookingConcessionsSumAggregateOutputType | null
    _min: BookingConcessionsMinAggregateOutputType | null
    _max: BookingConcessionsMaxAggregateOutputType | null
  }

  type GetBookingConcessionsGroupByPayload<T extends BookingConcessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingConcessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingConcessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingConcessionsGroupByOutputType[P]>
            : GetScalarType<T[P], BookingConcessionsGroupByOutputType[P]>
        }
      >
    >


  export type BookingConcessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    concession_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    total_price?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingConcessions"]>

  export type BookingConcessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    concession_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    total_price?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingConcessions"]>

  export type BookingConcessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    concession_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    total_price?: boolean
    created_at?: boolean
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingConcessions"]>

  export type BookingConcessionsSelectScalar = {
    id?: boolean
    booking_id?: boolean
    concession_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    total_price?: boolean
    created_at?: boolean
  }

  export type BookingConcessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "concession_id" | "quantity" | "unit_price" | "total_price" | "created_at", ExtArgs["result"]["bookingConcessions"]>
  export type BookingConcessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }
  export type BookingConcessionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }
  export type BookingConcessionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingsDefaultArgs<ExtArgs>
    concession?: boolean | ConcessionsDefaultArgs<ExtArgs>
  }

  export type $BookingConcessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookingConcessions"
    objects: {
      booking: Prisma.$BookingsPayload<ExtArgs>
      concession: Prisma.$ConcessionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_id: string
      concession_id: string
      quantity: number
      unit_price: Prisma.Decimal
      total_price: Prisma.Decimal
      created_at: Date
    }, ExtArgs["result"]["bookingConcessions"]>
    composites: {}
  }

  type BookingConcessionsGetPayload<S extends boolean | null | undefined | BookingConcessionsDefaultArgs> = $Result.GetResult<Prisma.$BookingConcessionsPayload, S>

  type BookingConcessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingConcessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingConcessionsCountAggregateInputType | true
    }

  export interface BookingConcessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingConcessions'], meta: { name: 'BookingConcessions' } }
    /**
     * Find zero or one BookingConcessions that matches the filter.
     * @param {BookingConcessionsFindUniqueArgs} args - Arguments to find a BookingConcessions
     * @example
     * // Get one BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingConcessionsFindUniqueArgs>(args: SelectSubset<T, BookingConcessionsFindUniqueArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookingConcessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingConcessionsFindUniqueOrThrowArgs} args - Arguments to find a BookingConcessions
     * @example
     * // Get one BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingConcessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingConcessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingConcessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsFindFirstArgs} args - Arguments to find a BookingConcessions
     * @example
     * // Get one BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingConcessionsFindFirstArgs>(args?: SelectSubset<T, BookingConcessionsFindFirstArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingConcessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsFindFirstOrThrowArgs} args - Arguments to find a BookingConcessions
     * @example
     * // Get one BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingConcessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingConcessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookingConcessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findMany()
     * 
     * // Get first 10 BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingConcessionsWithIdOnly = await prisma.bookingConcessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingConcessionsFindManyArgs>(args?: SelectSubset<T, BookingConcessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookingConcessions.
     * @param {BookingConcessionsCreateArgs} args - Arguments to create a BookingConcessions.
     * @example
     * // Create one BookingConcessions
     * const BookingConcessions = await prisma.bookingConcessions.create({
     *   data: {
     *     // ... data to create a BookingConcessions
     *   }
     * })
     * 
     */
    create<T extends BookingConcessionsCreateArgs>(args: SelectSubset<T, BookingConcessionsCreateArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookingConcessions.
     * @param {BookingConcessionsCreateManyArgs} args - Arguments to create many BookingConcessions.
     * @example
     * // Create many BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingConcessionsCreateManyArgs>(args?: SelectSubset<T, BookingConcessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookingConcessions and returns the data saved in the database.
     * @param {BookingConcessionsCreateManyAndReturnArgs} args - Arguments to create many BookingConcessions.
     * @example
     * // Create many BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookingConcessions and only return the `id`
     * const bookingConcessionsWithIdOnly = await prisma.bookingConcessions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingConcessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingConcessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookingConcessions.
     * @param {BookingConcessionsDeleteArgs} args - Arguments to delete one BookingConcessions.
     * @example
     * // Delete one BookingConcessions
     * const BookingConcessions = await prisma.bookingConcessions.delete({
     *   where: {
     *     // ... filter to delete one BookingConcessions
     *   }
     * })
     * 
     */
    delete<T extends BookingConcessionsDeleteArgs>(args: SelectSubset<T, BookingConcessionsDeleteArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookingConcessions.
     * @param {BookingConcessionsUpdateArgs} args - Arguments to update one BookingConcessions.
     * @example
     * // Update one BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingConcessionsUpdateArgs>(args: SelectSubset<T, BookingConcessionsUpdateArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookingConcessions.
     * @param {BookingConcessionsDeleteManyArgs} args - Arguments to filter BookingConcessions to delete.
     * @example
     * // Delete a few BookingConcessions
     * const { count } = await prisma.bookingConcessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingConcessionsDeleteManyArgs>(args?: SelectSubset<T, BookingConcessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingConcessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingConcessionsUpdateManyArgs>(args: SelectSubset<T, BookingConcessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingConcessions and returns the data updated in the database.
     * @param {BookingConcessionsUpdateManyAndReturnArgs} args - Arguments to update many BookingConcessions.
     * @example
     * // Update many BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookingConcessions and only return the `id`
     * const bookingConcessionsWithIdOnly = await prisma.bookingConcessions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingConcessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingConcessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookingConcessions.
     * @param {BookingConcessionsUpsertArgs} args - Arguments to update or create a BookingConcessions.
     * @example
     * // Update or create a BookingConcessions
     * const bookingConcessions = await prisma.bookingConcessions.upsert({
     *   create: {
     *     // ... data to create a BookingConcessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingConcessions we want to update
     *   }
     * })
     */
    upsert<T extends BookingConcessionsUpsertArgs>(args: SelectSubset<T, BookingConcessionsUpsertArgs<ExtArgs>>): Prisma__BookingConcessionsClient<$Result.GetResult<Prisma.$BookingConcessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookingConcessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsCountArgs} args - Arguments to filter BookingConcessions to count.
     * @example
     * // Count the number of BookingConcessions
     * const count = await prisma.bookingConcessions.count({
     *   where: {
     *     // ... the filter for the BookingConcessions we want to count
     *   }
     * })
    **/
    count<T extends BookingConcessionsCountArgs>(
      args?: Subset<T, BookingConcessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingConcessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingConcessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingConcessionsAggregateArgs>(args: Subset<T, BookingConcessionsAggregateArgs>): Prisma.PrismaPromise<GetBookingConcessionsAggregateType<T>>

    /**
     * Group by BookingConcessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingConcessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingConcessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingConcessionsGroupByArgs['orderBy'] }
        : { orderBy?: BookingConcessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingConcessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingConcessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookingConcessions model
   */
  readonly fields: BookingConcessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingConcessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingConcessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingsDefaultArgs<ExtArgs>>): Prisma__BookingsClient<$Result.GetResult<Prisma.$BookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    concession<T extends ConcessionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConcessionsDefaultArgs<ExtArgs>>): Prisma__ConcessionsClient<$Result.GetResult<Prisma.$ConcessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookingConcessions model
   */
  interface BookingConcessionsFieldRefs {
    readonly id: FieldRef<"BookingConcessions", 'String'>
    readonly booking_id: FieldRef<"BookingConcessions", 'String'>
    readonly concession_id: FieldRef<"BookingConcessions", 'String'>
    readonly quantity: FieldRef<"BookingConcessions", 'Int'>
    readonly unit_price: FieldRef<"BookingConcessions", 'Decimal'>
    readonly total_price: FieldRef<"BookingConcessions", 'Decimal'>
    readonly created_at: FieldRef<"BookingConcessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookingConcessions findUnique
   */
  export type BookingConcessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which BookingConcessions to fetch.
     */
    where: BookingConcessionsWhereUniqueInput
  }

  /**
   * BookingConcessions findUniqueOrThrow
   */
  export type BookingConcessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which BookingConcessions to fetch.
     */
    where: BookingConcessionsWhereUniqueInput
  }

  /**
   * BookingConcessions findFirst
   */
  export type BookingConcessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which BookingConcessions to fetch.
     */
    where?: BookingConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingConcessions to fetch.
     */
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingConcessions.
     */
    cursor?: BookingConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingConcessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingConcessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingConcessions.
     */
    distinct?: BookingConcessionsScalarFieldEnum | BookingConcessionsScalarFieldEnum[]
  }

  /**
   * BookingConcessions findFirstOrThrow
   */
  export type BookingConcessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which BookingConcessions to fetch.
     */
    where?: BookingConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingConcessions to fetch.
     */
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingConcessions.
     */
    cursor?: BookingConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingConcessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingConcessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingConcessions.
     */
    distinct?: BookingConcessionsScalarFieldEnum | BookingConcessionsScalarFieldEnum[]
  }

  /**
   * BookingConcessions findMany
   */
  export type BookingConcessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter, which BookingConcessions to fetch.
     */
    where?: BookingConcessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingConcessions to fetch.
     */
    orderBy?: BookingConcessionsOrderByWithRelationInput | BookingConcessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingConcessions.
     */
    cursor?: BookingConcessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingConcessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingConcessions.
     */
    skip?: number
    distinct?: BookingConcessionsScalarFieldEnum | BookingConcessionsScalarFieldEnum[]
  }

  /**
   * BookingConcessions create
   */
  export type BookingConcessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a BookingConcessions.
     */
    data: XOR<BookingConcessionsCreateInput, BookingConcessionsUncheckedCreateInput>
  }

  /**
   * BookingConcessions createMany
   */
  export type BookingConcessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingConcessions.
     */
    data: BookingConcessionsCreateManyInput | BookingConcessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookingConcessions createManyAndReturn
   */
  export type BookingConcessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * The data used to create many BookingConcessions.
     */
    data: BookingConcessionsCreateManyInput | BookingConcessionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingConcessions update
   */
  export type BookingConcessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a BookingConcessions.
     */
    data: XOR<BookingConcessionsUpdateInput, BookingConcessionsUncheckedUpdateInput>
    /**
     * Choose, which BookingConcessions to update.
     */
    where: BookingConcessionsWhereUniqueInput
  }

  /**
   * BookingConcessions updateMany
   */
  export type BookingConcessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingConcessions.
     */
    data: XOR<BookingConcessionsUpdateManyMutationInput, BookingConcessionsUncheckedUpdateManyInput>
    /**
     * Filter which BookingConcessions to update
     */
    where?: BookingConcessionsWhereInput
    /**
     * Limit how many BookingConcessions to update.
     */
    limit?: number
  }

  /**
   * BookingConcessions updateManyAndReturn
   */
  export type BookingConcessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * The data used to update BookingConcessions.
     */
    data: XOR<BookingConcessionsUpdateManyMutationInput, BookingConcessionsUncheckedUpdateManyInput>
    /**
     * Filter which BookingConcessions to update
     */
    where?: BookingConcessionsWhereInput
    /**
     * Limit how many BookingConcessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingConcessions upsert
   */
  export type BookingConcessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the BookingConcessions to update in case it exists.
     */
    where: BookingConcessionsWhereUniqueInput
    /**
     * In case the BookingConcessions found by the `where` argument doesn't exist, create a new BookingConcessions with this data.
     */
    create: XOR<BookingConcessionsCreateInput, BookingConcessionsUncheckedCreateInput>
    /**
     * In case the BookingConcessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingConcessionsUpdateInput, BookingConcessionsUncheckedUpdateInput>
  }

  /**
   * BookingConcessions delete
   */
  export type BookingConcessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
    /**
     * Filter which BookingConcessions to delete.
     */
    where: BookingConcessionsWhereUniqueInput
  }

  /**
   * BookingConcessions deleteMany
   */
  export type BookingConcessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingConcessions to delete
     */
    where?: BookingConcessionsWhereInput
    /**
     * Limit how many BookingConcessions to delete.
     */
    limit?: number
  }

  /**
   * BookingConcessions without action
   */
  export type BookingConcessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingConcessions
     */
    select?: BookingConcessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingConcessions
     */
    omit?: BookingConcessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingConcessionsInclude<ExtArgs> | null
  }


  /**
   * Model Promotions
   */

  export type AggregatePromotions = {
    _count: PromotionsCountAggregateOutputType | null
    _avg: PromotionsAvgAggregateOutputType | null
    _sum: PromotionsSumAggregateOutputType | null
    _min: PromotionsMinAggregateOutputType | null
    _max: PromotionsMaxAggregateOutputType | null
  }

  export type PromotionsAvgAggregateOutputType = {
    value: Decimal | null
    min_purchase: Decimal | null
    max_discount: Decimal | null
    usage_limit: number | null
    usage_per_user: number | null
    current_usage: number | null
  }

  export type PromotionsSumAggregateOutputType = {
    value: Decimal | null
    min_purchase: Decimal | null
    max_discount: Decimal | null
    usage_limit: number | null
    usage_per_user: number | null
    current_usage: number | null
  }

  export type PromotionsMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    type: $Enums.PromotionType | null
    value: Decimal | null
    min_purchase: Decimal | null
    max_discount: Decimal | null
    valid_from: Date | null
    valid_to: Date | null
    usage_limit: number | null
    usage_per_user: number | null
    current_usage: number | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PromotionsMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    type: $Enums.PromotionType | null
    value: Decimal | null
    min_purchase: Decimal | null
    max_discount: Decimal | null
    valid_from: Date | null
    valid_to: Date | null
    usage_limit: number | null
    usage_per_user: number | null
    current_usage: number | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PromotionsCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    type: number
    value: number
    min_purchase: number
    max_discount: number
    valid_from: number
    valid_to: number
    usage_limit: number
    usage_per_user: number
    current_usage: number
    applicable_for: number
    conditions: number
    active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PromotionsAvgAggregateInputType = {
    value?: true
    min_purchase?: true
    max_discount?: true
    usage_limit?: true
    usage_per_user?: true
    current_usage?: true
  }

  export type PromotionsSumAggregateInputType = {
    value?: true
    min_purchase?: true
    max_discount?: true
    usage_limit?: true
    usage_per_user?: true
    current_usage?: true
  }

  export type PromotionsMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    type?: true
    value?: true
    min_purchase?: true
    max_discount?: true
    valid_from?: true
    valid_to?: true
    usage_limit?: true
    usage_per_user?: true
    current_usage?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type PromotionsMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    type?: true
    value?: true
    min_purchase?: true
    max_discount?: true
    valid_from?: true
    valid_to?: true
    usage_limit?: true
    usage_per_user?: true
    current_usage?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type PromotionsCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    type?: true
    value?: true
    min_purchase?: true
    max_discount?: true
    valid_from?: true
    valid_to?: true
    usage_limit?: true
    usage_per_user?: true
    current_usage?: true
    applicable_for?: true
    conditions?: true
    active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PromotionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotions to aggregate.
     */
    where?: PromotionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionsOrderByWithRelationInput | PromotionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromotionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promotions
    **/
    _count?: true | PromotionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromotionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromotionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromotionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromotionsMaxAggregateInputType
  }

  export type GetPromotionsAggregateType<T extends PromotionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePromotions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromotions[P]>
      : GetScalarType<T[P], AggregatePromotions[P]>
  }




  export type PromotionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromotionsWhereInput
    orderBy?: PromotionsOrderByWithAggregationInput | PromotionsOrderByWithAggregationInput[]
    by: PromotionsScalarFieldEnum[] | PromotionsScalarFieldEnum
    having?: PromotionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromotionsCountAggregateInputType | true
    _avg?: PromotionsAvgAggregateInputType
    _sum?: PromotionsSumAggregateInputType
    _min?: PromotionsMinAggregateInputType
    _max?: PromotionsMaxAggregateInputType
  }

  export type PromotionsGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    type: $Enums.PromotionType
    value: Decimal
    min_purchase: Decimal | null
    max_discount: Decimal | null
    valid_from: Date
    valid_to: Date
    usage_limit: number | null
    usage_per_user: number | null
    current_usage: number
    applicable_for: string[]
    conditions: JsonValue | null
    active: boolean
    created_at: Date
    updated_at: Date
    _count: PromotionsCountAggregateOutputType | null
    _avg: PromotionsAvgAggregateOutputType | null
    _sum: PromotionsSumAggregateOutputType | null
    _min: PromotionsMinAggregateOutputType | null
    _max: PromotionsMaxAggregateOutputType | null
  }

  type GetPromotionsGroupByPayload<T extends PromotionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromotionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromotionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromotionsGroupByOutputType[P]>
            : GetScalarType<T[P], PromotionsGroupByOutputType[P]>
        }
      >
    >


  export type PromotionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    value?: boolean
    min_purchase?: boolean
    max_discount?: boolean
    valid_from?: boolean
    valid_to?: boolean
    usage_limit?: boolean
    usage_per_user?: boolean
    current_usage?: boolean
    applicable_for?: boolean
    conditions?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["promotions"]>

  export type PromotionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    value?: boolean
    min_purchase?: boolean
    max_discount?: boolean
    valid_from?: boolean
    valid_to?: boolean
    usage_limit?: boolean
    usage_per_user?: boolean
    current_usage?: boolean
    applicable_for?: boolean
    conditions?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["promotions"]>

  export type PromotionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    value?: boolean
    min_purchase?: boolean
    max_discount?: boolean
    valid_from?: boolean
    valid_to?: boolean
    usage_limit?: boolean
    usage_per_user?: boolean
    current_usage?: boolean
    applicable_for?: boolean
    conditions?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["promotions"]>

  export type PromotionsSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    value?: boolean
    min_purchase?: boolean
    max_discount?: boolean
    valid_from?: boolean
    valid_to?: boolean
    usage_limit?: boolean
    usage_per_user?: boolean
    current_usage?: boolean
    applicable_for?: boolean
    conditions?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PromotionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "type" | "value" | "min_purchase" | "max_discount" | "valid_from" | "valid_to" | "usage_limit" | "usage_per_user" | "current_usage" | "applicable_for" | "conditions" | "active" | "created_at" | "updated_at", ExtArgs["result"]["promotions"]>

  export type $PromotionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promotions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      type: $Enums.PromotionType
      value: Prisma.Decimal
      min_purchase: Prisma.Decimal | null
      max_discount: Prisma.Decimal | null
      valid_from: Date
      valid_to: Date
      usage_limit: number | null
      usage_per_user: number | null
      current_usage: number
      applicable_for: string[]
      conditions: Prisma.JsonValue | null
      active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["promotions"]>
    composites: {}
  }

  type PromotionsGetPayload<S extends boolean | null | undefined | PromotionsDefaultArgs> = $Result.GetResult<Prisma.$PromotionsPayload, S>

  type PromotionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromotionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromotionsCountAggregateInputType | true
    }

  export interface PromotionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promotions'], meta: { name: 'Promotions' } }
    /**
     * Find zero or one Promotions that matches the filter.
     * @param {PromotionsFindUniqueArgs} args - Arguments to find a Promotions
     * @example
     * // Get one Promotions
     * const promotions = await prisma.promotions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromotionsFindUniqueArgs>(args: SelectSubset<T, PromotionsFindUniqueArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promotions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromotionsFindUniqueOrThrowArgs} args - Arguments to find a Promotions
     * @example
     * // Get one Promotions
     * const promotions = await prisma.promotions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromotionsFindUniqueOrThrowArgs>(args: SelectSubset<T, PromotionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsFindFirstArgs} args - Arguments to find a Promotions
     * @example
     * // Get one Promotions
     * const promotions = await prisma.promotions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromotionsFindFirstArgs>(args?: SelectSubset<T, PromotionsFindFirstArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promotions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsFindFirstOrThrowArgs} args - Arguments to find a Promotions
     * @example
     * // Get one Promotions
     * const promotions = await prisma.promotions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromotionsFindFirstOrThrowArgs>(args?: SelectSubset<T, PromotionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promotions
     * const promotions = await prisma.promotions.findMany()
     * 
     * // Get first 10 Promotions
     * const promotions = await prisma.promotions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promotionsWithIdOnly = await prisma.promotions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromotionsFindManyArgs>(args?: SelectSubset<T, PromotionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promotions.
     * @param {PromotionsCreateArgs} args - Arguments to create a Promotions.
     * @example
     * // Create one Promotions
     * const Promotions = await prisma.promotions.create({
     *   data: {
     *     // ... data to create a Promotions
     *   }
     * })
     * 
     */
    create<T extends PromotionsCreateArgs>(args: SelectSubset<T, PromotionsCreateArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promotions.
     * @param {PromotionsCreateManyArgs} args - Arguments to create many Promotions.
     * @example
     * // Create many Promotions
     * const promotions = await prisma.promotions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromotionsCreateManyArgs>(args?: SelectSubset<T, PromotionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promotions and returns the data saved in the database.
     * @param {PromotionsCreateManyAndReturnArgs} args - Arguments to create many Promotions.
     * @example
     * // Create many Promotions
     * const promotions = await prisma.promotions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promotions and only return the `id`
     * const promotionsWithIdOnly = await prisma.promotions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromotionsCreateManyAndReturnArgs>(args?: SelectSubset<T, PromotionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Promotions.
     * @param {PromotionsDeleteArgs} args - Arguments to delete one Promotions.
     * @example
     * // Delete one Promotions
     * const Promotions = await prisma.promotions.delete({
     *   where: {
     *     // ... filter to delete one Promotions
     *   }
     * })
     * 
     */
    delete<T extends PromotionsDeleteArgs>(args: SelectSubset<T, PromotionsDeleteArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promotions.
     * @param {PromotionsUpdateArgs} args - Arguments to update one Promotions.
     * @example
     * // Update one Promotions
     * const promotions = await prisma.promotions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromotionsUpdateArgs>(args: SelectSubset<T, PromotionsUpdateArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promotions.
     * @param {PromotionsDeleteManyArgs} args - Arguments to filter Promotions to delete.
     * @example
     * // Delete a few Promotions
     * const { count } = await prisma.promotions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromotionsDeleteManyArgs>(args?: SelectSubset<T, PromotionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promotions
     * const promotions = await prisma.promotions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromotionsUpdateManyArgs>(args: SelectSubset<T, PromotionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotions and returns the data updated in the database.
     * @param {PromotionsUpdateManyAndReturnArgs} args - Arguments to update many Promotions.
     * @example
     * // Update many Promotions
     * const promotions = await prisma.promotions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Promotions and only return the `id`
     * const promotionsWithIdOnly = await prisma.promotions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromotionsUpdateManyAndReturnArgs>(args: SelectSubset<T, PromotionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Promotions.
     * @param {PromotionsUpsertArgs} args - Arguments to update or create a Promotions.
     * @example
     * // Update or create a Promotions
     * const promotions = await prisma.promotions.upsert({
     *   create: {
     *     // ... data to create a Promotions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promotions we want to update
     *   }
     * })
     */
    upsert<T extends PromotionsUpsertArgs>(args: SelectSubset<T, PromotionsUpsertArgs<ExtArgs>>): Prisma__PromotionsClient<$Result.GetResult<Prisma.$PromotionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsCountArgs} args - Arguments to filter Promotions to count.
     * @example
     * // Count the number of Promotions
     * const count = await prisma.promotions.count({
     *   where: {
     *     // ... the filter for the Promotions we want to count
     *   }
     * })
    **/
    count<T extends PromotionsCountArgs>(
      args?: Subset<T, PromotionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromotionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromotionsAggregateArgs>(args: Subset<T, PromotionsAggregateArgs>): Prisma.PrismaPromise<GetPromotionsAggregateType<T>>

    /**
     * Group by Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromotionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromotionsGroupByArgs['orderBy'] }
        : { orderBy?: PromotionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromotionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promotions model
   */
  readonly fields: PromotionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promotions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromotionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Promotions model
   */
  interface PromotionsFieldRefs {
    readonly id: FieldRef<"Promotions", 'String'>
    readonly code: FieldRef<"Promotions", 'String'>
    readonly name: FieldRef<"Promotions", 'String'>
    readonly description: FieldRef<"Promotions", 'String'>
    readonly type: FieldRef<"Promotions", 'PromotionType'>
    readonly value: FieldRef<"Promotions", 'Decimal'>
    readonly min_purchase: FieldRef<"Promotions", 'Decimal'>
    readonly max_discount: FieldRef<"Promotions", 'Decimal'>
    readonly valid_from: FieldRef<"Promotions", 'DateTime'>
    readonly valid_to: FieldRef<"Promotions", 'DateTime'>
    readonly usage_limit: FieldRef<"Promotions", 'Int'>
    readonly usage_per_user: FieldRef<"Promotions", 'Int'>
    readonly current_usage: FieldRef<"Promotions", 'Int'>
    readonly applicable_for: FieldRef<"Promotions", 'String[]'>
    readonly conditions: FieldRef<"Promotions", 'Json'>
    readonly active: FieldRef<"Promotions", 'Boolean'>
    readonly created_at: FieldRef<"Promotions", 'DateTime'>
    readonly updated_at: FieldRef<"Promotions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Promotions findUnique
   */
  export type PromotionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where: PromotionsWhereUniqueInput
  }

  /**
   * Promotions findUniqueOrThrow
   */
  export type PromotionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where: PromotionsWhereUniqueInput
  }

  /**
   * Promotions findFirst
   */
  export type PromotionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where?: PromotionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionsOrderByWithRelationInput | PromotionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionsScalarFieldEnum | PromotionsScalarFieldEnum[]
  }

  /**
   * Promotions findFirstOrThrow
   */
  export type PromotionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where?: PromotionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionsOrderByWithRelationInput | PromotionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionsScalarFieldEnum | PromotionsScalarFieldEnum[]
  }

  /**
   * Promotions findMany
   */
  export type PromotionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where?: PromotionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionsOrderByWithRelationInput | PromotionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promotions.
     */
    cursor?: PromotionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    distinct?: PromotionsScalarFieldEnum | PromotionsScalarFieldEnum[]
  }

  /**
   * Promotions create
   */
  export type PromotionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * The data needed to create a Promotions.
     */
    data: XOR<PromotionsCreateInput, PromotionsUncheckedCreateInput>
  }

  /**
   * Promotions createMany
   */
  export type PromotionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promotions.
     */
    data: PromotionsCreateManyInput | PromotionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promotions createManyAndReturn
   */
  export type PromotionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * The data used to create many Promotions.
     */
    data: PromotionsCreateManyInput | PromotionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promotions update
   */
  export type PromotionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * The data needed to update a Promotions.
     */
    data: XOR<PromotionsUpdateInput, PromotionsUncheckedUpdateInput>
    /**
     * Choose, which Promotions to update.
     */
    where: PromotionsWhereUniqueInput
  }

  /**
   * Promotions updateMany
   */
  export type PromotionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promotions.
     */
    data: XOR<PromotionsUpdateManyMutationInput, PromotionsUncheckedUpdateManyInput>
    /**
     * Filter which Promotions to update
     */
    where?: PromotionsWhereInput
    /**
     * Limit how many Promotions to update.
     */
    limit?: number
  }

  /**
   * Promotions updateManyAndReturn
   */
  export type PromotionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * The data used to update Promotions.
     */
    data: XOR<PromotionsUpdateManyMutationInput, PromotionsUncheckedUpdateManyInput>
    /**
     * Filter which Promotions to update
     */
    where?: PromotionsWhereInput
    /**
     * Limit how many Promotions to update.
     */
    limit?: number
  }

  /**
   * Promotions upsert
   */
  export type PromotionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * The filter to search for the Promotions to update in case it exists.
     */
    where: PromotionsWhereUniqueInput
    /**
     * In case the Promotions found by the `where` argument doesn't exist, create a new Promotions with this data.
     */
    create: XOR<PromotionsCreateInput, PromotionsUncheckedCreateInput>
    /**
     * In case the Promotions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromotionsUpdateInput, PromotionsUncheckedUpdateInput>
  }

  /**
   * Promotions delete
   */
  export type PromotionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
    /**
     * Filter which Promotions to delete.
     */
    where: PromotionsWhereUniqueInput
  }

  /**
   * Promotions deleteMany
   */
  export type PromotionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotions to delete
     */
    where?: PromotionsWhereInput
    /**
     * Limit how many Promotions to delete.
     */
    limit?: number
  }

  /**
   * Promotions without action
   */
  export type PromotionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotions
     */
    select?: PromotionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotions
     */
    omit?: PromotionsOmit<ExtArgs> | null
  }


  /**
   * Model LoyaltyAccounts
   */

  export type AggregateLoyaltyAccounts = {
    _count: LoyaltyAccountsCountAggregateOutputType | null
    _avg: LoyaltyAccountsAvgAggregateOutputType | null
    _sum: LoyaltyAccountsSumAggregateOutputType | null
    _min: LoyaltyAccountsMinAggregateOutputType | null
    _max: LoyaltyAccountsMaxAggregateOutputType | null
  }

  export type LoyaltyAccountsAvgAggregateOutputType = {
    current_points: number | null
    total_spent: Decimal | null
  }

  export type LoyaltyAccountsSumAggregateOutputType = {
    current_points: number | null
    total_spent: Decimal | null
  }

  export type LoyaltyAccountsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    current_points: number | null
    tier: $Enums.LoyaltyTier | null
    total_spent: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LoyaltyAccountsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    current_points: number | null
    tier: $Enums.LoyaltyTier | null
    total_spent: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LoyaltyAccountsCountAggregateOutputType = {
    id: number
    user_id: number
    current_points: number
    tier: number
    total_spent: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LoyaltyAccountsAvgAggregateInputType = {
    current_points?: true
    total_spent?: true
  }

  export type LoyaltyAccountsSumAggregateInputType = {
    current_points?: true
    total_spent?: true
  }

  export type LoyaltyAccountsMinAggregateInputType = {
    id?: true
    user_id?: true
    current_points?: true
    tier?: true
    total_spent?: true
    created_at?: true
    updated_at?: true
  }

  export type LoyaltyAccountsMaxAggregateInputType = {
    id?: true
    user_id?: true
    current_points?: true
    tier?: true
    total_spent?: true
    created_at?: true
    updated_at?: true
  }

  export type LoyaltyAccountsCountAggregateInputType = {
    id?: true
    user_id?: true
    current_points?: true
    tier?: true
    total_spent?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LoyaltyAccountsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyAccounts to aggregate.
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyAccounts to fetch.
     */
    orderBy?: LoyaltyAccountsOrderByWithRelationInput | LoyaltyAccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyAccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyAccounts
    **/
    _count?: true | LoyaltyAccountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyAccountsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyAccountsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyAccountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyAccountsMaxAggregateInputType
  }

  export type GetLoyaltyAccountsAggregateType<T extends LoyaltyAccountsAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyAccounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyAccounts[P]>
      : GetScalarType<T[P], AggregateLoyaltyAccounts[P]>
  }




  export type LoyaltyAccountsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyAccountsWhereInput
    orderBy?: LoyaltyAccountsOrderByWithAggregationInput | LoyaltyAccountsOrderByWithAggregationInput[]
    by: LoyaltyAccountsScalarFieldEnum[] | LoyaltyAccountsScalarFieldEnum
    having?: LoyaltyAccountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyAccountsCountAggregateInputType | true
    _avg?: LoyaltyAccountsAvgAggregateInputType
    _sum?: LoyaltyAccountsSumAggregateInputType
    _min?: LoyaltyAccountsMinAggregateInputType
    _max?: LoyaltyAccountsMaxAggregateInputType
  }

  export type LoyaltyAccountsGroupByOutputType = {
    id: string
    user_id: string
    current_points: number
    tier: $Enums.LoyaltyTier
    total_spent: Decimal
    created_at: Date
    updated_at: Date
    _count: LoyaltyAccountsCountAggregateOutputType | null
    _avg: LoyaltyAccountsAvgAggregateOutputType | null
    _sum: LoyaltyAccountsSumAggregateOutputType | null
    _min: LoyaltyAccountsMinAggregateOutputType | null
    _max: LoyaltyAccountsMaxAggregateOutputType | null
  }

  type GetLoyaltyAccountsGroupByPayload<T extends LoyaltyAccountsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyAccountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyAccountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyAccountsGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyAccountsGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyAccountsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    current_points?: boolean
    tier?: boolean
    total_spent?: boolean
    created_at?: boolean
    updated_at?: boolean
    transactions?: boolean | LoyaltyAccounts$transactionsArgs<ExtArgs>
    _count?: boolean | LoyaltyAccountsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyAccounts"]>

  export type LoyaltyAccountsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    current_points?: boolean
    tier?: boolean
    total_spent?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["loyaltyAccounts"]>

  export type LoyaltyAccountsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    current_points?: boolean
    tier?: boolean
    total_spent?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["loyaltyAccounts"]>

  export type LoyaltyAccountsSelectScalar = {
    id?: boolean
    user_id?: boolean
    current_points?: boolean
    tier?: boolean
    total_spent?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LoyaltyAccountsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "current_points" | "tier" | "total_spent" | "created_at" | "updated_at", ExtArgs["result"]["loyaltyAccounts"]>
  export type LoyaltyAccountsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | LoyaltyAccounts$transactionsArgs<ExtArgs>
    _count?: boolean | LoyaltyAccountsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoyaltyAccountsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LoyaltyAccountsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LoyaltyAccountsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyAccounts"
    objects: {
      transactions: Prisma.$LoyaltyTransactionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      current_points: number
      tier: $Enums.LoyaltyTier
      total_spent: Prisma.Decimal
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["loyaltyAccounts"]>
    composites: {}
  }

  type LoyaltyAccountsGetPayload<S extends boolean | null | undefined | LoyaltyAccountsDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyAccountsPayload, S>

  type LoyaltyAccountsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyAccountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyAccountsCountAggregateInputType | true
    }

  export interface LoyaltyAccountsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyAccounts'], meta: { name: 'LoyaltyAccounts' } }
    /**
     * Find zero or one LoyaltyAccounts that matches the filter.
     * @param {LoyaltyAccountsFindUniqueArgs} args - Arguments to find a LoyaltyAccounts
     * @example
     * // Get one LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyAccountsFindUniqueArgs>(args: SelectSubset<T, LoyaltyAccountsFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyAccounts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyAccountsFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyAccounts
     * @example
     * // Get one LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyAccountsFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyAccountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsFindFirstArgs} args - Arguments to find a LoyaltyAccounts
     * @example
     * // Get one LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyAccountsFindFirstArgs>(args?: SelectSubset<T, LoyaltyAccountsFindFirstArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyAccounts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsFindFirstOrThrowArgs} args - Arguments to find a LoyaltyAccounts
     * @example
     * // Get one LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyAccountsFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyAccountsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findMany()
     * 
     * // Get first 10 LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyAccountsWithIdOnly = await prisma.loyaltyAccounts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyAccountsFindManyArgs>(args?: SelectSubset<T, LoyaltyAccountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyAccounts.
     * @param {LoyaltyAccountsCreateArgs} args - Arguments to create a LoyaltyAccounts.
     * @example
     * // Create one LoyaltyAccounts
     * const LoyaltyAccounts = await prisma.loyaltyAccounts.create({
     *   data: {
     *     // ... data to create a LoyaltyAccounts
     *   }
     * })
     * 
     */
    create<T extends LoyaltyAccountsCreateArgs>(args: SelectSubset<T, LoyaltyAccountsCreateArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyAccounts.
     * @param {LoyaltyAccountsCreateManyArgs} args - Arguments to create many LoyaltyAccounts.
     * @example
     * // Create many LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyAccountsCreateManyArgs>(args?: SelectSubset<T, LoyaltyAccountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyAccounts and returns the data saved in the database.
     * @param {LoyaltyAccountsCreateManyAndReturnArgs} args - Arguments to create many LoyaltyAccounts.
     * @example
     * // Create many LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyAccounts and only return the `id`
     * const loyaltyAccountsWithIdOnly = await prisma.loyaltyAccounts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyAccountsCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyAccountsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyAccounts.
     * @param {LoyaltyAccountsDeleteArgs} args - Arguments to delete one LoyaltyAccounts.
     * @example
     * // Delete one LoyaltyAccounts
     * const LoyaltyAccounts = await prisma.loyaltyAccounts.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyAccounts
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyAccountsDeleteArgs>(args: SelectSubset<T, LoyaltyAccountsDeleteArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyAccounts.
     * @param {LoyaltyAccountsUpdateArgs} args - Arguments to update one LoyaltyAccounts.
     * @example
     * // Update one LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyAccountsUpdateArgs>(args: SelectSubset<T, LoyaltyAccountsUpdateArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyAccounts.
     * @param {LoyaltyAccountsDeleteManyArgs} args - Arguments to filter LoyaltyAccounts to delete.
     * @example
     * // Delete a few LoyaltyAccounts
     * const { count } = await prisma.loyaltyAccounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyAccountsDeleteManyArgs>(args?: SelectSubset<T, LoyaltyAccountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyAccountsUpdateManyArgs>(args: SelectSubset<T, LoyaltyAccountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyAccounts and returns the data updated in the database.
     * @param {LoyaltyAccountsUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyAccounts.
     * @example
     * // Update many LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyAccounts and only return the `id`
     * const loyaltyAccountsWithIdOnly = await prisma.loyaltyAccounts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyAccountsUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyAccountsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyAccounts.
     * @param {LoyaltyAccountsUpsertArgs} args - Arguments to update or create a LoyaltyAccounts.
     * @example
     * // Update or create a LoyaltyAccounts
     * const loyaltyAccounts = await prisma.loyaltyAccounts.upsert({
     *   create: {
     *     // ... data to create a LoyaltyAccounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyAccounts we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyAccountsUpsertArgs>(args: SelectSubset<T, LoyaltyAccountsUpsertArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsCountArgs} args - Arguments to filter LoyaltyAccounts to count.
     * @example
     * // Count the number of LoyaltyAccounts
     * const count = await prisma.loyaltyAccounts.count({
     *   where: {
     *     // ... the filter for the LoyaltyAccounts we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyAccountsCountArgs>(
      args?: Subset<T, LoyaltyAccountsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyAccountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyAccountsAggregateArgs>(args: Subset<T, LoyaltyAccountsAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyAccountsAggregateType<T>>

    /**
     * Group by LoyaltyAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyAccountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyAccountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyAccountsGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyAccountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyAccountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyAccountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyAccounts model
   */
  readonly fields: LoyaltyAccountsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyAccounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyAccountsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends LoyaltyAccounts$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyAccounts$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyAccounts model
   */
  interface LoyaltyAccountsFieldRefs {
    readonly id: FieldRef<"LoyaltyAccounts", 'String'>
    readonly user_id: FieldRef<"LoyaltyAccounts", 'String'>
    readonly current_points: FieldRef<"LoyaltyAccounts", 'Int'>
    readonly tier: FieldRef<"LoyaltyAccounts", 'LoyaltyTier'>
    readonly total_spent: FieldRef<"LoyaltyAccounts", 'Decimal'>
    readonly created_at: FieldRef<"LoyaltyAccounts", 'DateTime'>
    readonly updated_at: FieldRef<"LoyaltyAccounts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyAccounts findUnique
   */
  export type LoyaltyAccountsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyAccounts to fetch.
     */
    where: LoyaltyAccountsWhereUniqueInput
  }

  /**
   * LoyaltyAccounts findUniqueOrThrow
   */
  export type LoyaltyAccountsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyAccounts to fetch.
     */
    where: LoyaltyAccountsWhereUniqueInput
  }

  /**
   * LoyaltyAccounts findFirst
   */
  export type LoyaltyAccountsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyAccounts to fetch.
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyAccounts to fetch.
     */
    orderBy?: LoyaltyAccountsOrderByWithRelationInput | LoyaltyAccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyAccounts.
     */
    cursor?: LoyaltyAccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyAccounts.
     */
    distinct?: LoyaltyAccountsScalarFieldEnum | LoyaltyAccountsScalarFieldEnum[]
  }

  /**
   * LoyaltyAccounts findFirstOrThrow
   */
  export type LoyaltyAccountsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyAccounts to fetch.
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyAccounts to fetch.
     */
    orderBy?: LoyaltyAccountsOrderByWithRelationInput | LoyaltyAccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyAccounts.
     */
    cursor?: LoyaltyAccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyAccounts.
     */
    distinct?: LoyaltyAccountsScalarFieldEnum | LoyaltyAccountsScalarFieldEnum[]
  }

  /**
   * LoyaltyAccounts findMany
   */
  export type LoyaltyAccountsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyAccounts to fetch.
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyAccounts to fetch.
     */
    orderBy?: LoyaltyAccountsOrderByWithRelationInput | LoyaltyAccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyAccounts.
     */
    cursor?: LoyaltyAccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyAccounts.
     */
    skip?: number
    distinct?: LoyaltyAccountsScalarFieldEnum | LoyaltyAccountsScalarFieldEnum[]
  }

  /**
   * LoyaltyAccounts create
   */
  export type LoyaltyAccountsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyAccounts.
     */
    data: XOR<LoyaltyAccountsCreateInput, LoyaltyAccountsUncheckedCreateInput>
  }

  /**
   * LoyaltyAccounts createMany
   */
  export type LoyaltyAccountsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyAccounts.
     */
    data: LoyaltyAccountsCreateManyInput | LoyaltyAccountsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyAccounts createManyAndReturn
   */
  export type LoyaltyAccountsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyAccounts.
     */
    data: LoyaltyAccountsCreateManyInput | LoyaltyAccountsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyAccounts update
   */
  export type LoyaltyAccountsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyAccounts.
     */
    data: XOR<LoyaltyAccountsUpdateInput, LoyaltyAccountsUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyAccounts to update.
     */
    where: LoyaltyAccountsWhereUniqueInput
  }

  /**
   * LoyaltyAccounts updateMany
   */
  export type LoyaltyAccountsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyAccounts.
     */
    data: XOR<LoyaltyAccountsUpdateManyMutationInput, LoyaltyAccountsUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyAccounts to update
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * Limit how many LoyaltyAccounts to update.
     */
    limit?: number
  }

  /**
   * LoyaltyAccounts updateManyAndReturn
   */
  export type LoyaltyAccountsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyAccounts.
     */
    data: XOR<LoyaltyAccountsUpdateManyMutationInput, LoyaltyAccountsUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyAccounts to update
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * Limit how many LoyaltyAccounts to update.
     */
    limit?: number
  }

  /**
   * LoyaltyAccounts upsert
   */
  export type LoyaltyAccountsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyAccounts to update in case it exists.
     */
    where: LoyaltyAccountsWhereUniqueInput
    /**
     * In case the LoyaltyAccounts found by the `where` argument doesn't exist, create a new LoyaltyAccounts with this data.
     */
    create: XOR<LoyaltyAccountsCreateInput, LoyaltyAccountsUncheckedCreateInput>
    /**
     * In case the LoyaltyAccounts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyAccountsUpdateInput, LoyaltyAccountsUncheckedUpdateInput>
  }

  /**
   * LoyaltyAccounts delete
   */
  export type LoyaltyAccountsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyAccounts to delete.
     */
    where: LoyaltyAccountsWhereUniqueInput
  }

  /**
   * LoyaltyAccounts deleteMany
   */
  export type LoyaltyAccountsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyAccounts to delete
     */
    where?: LoyaltyAccountsWhereInput
    /**
     * Limit how many LoyaltyAccounts to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyAccounts.transactions
   */
  export type LoyaltyAccounts$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    where?: LoyaltyTransactionsWhereInput
    orderBy?: LoyaltyTransactionsOrderByWithRelationInput | LoyaltyTransactionsOrderByWithRelationInput[]
    cursor?: LoyaltyTransactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltyTransactionsScalarFieldEnum | LoyaltyTransactionsScalarFieldEnum[]
  }

  /**
   * LoyaltyAccounts without action
   */
  export type LoyaltyAccountsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyAccounts
     */
    select?: LoyaltyAccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyAccounts
     */
    omit?: LoyaltyAccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyAccountsInclude<ExtArgs> | null
  }


  /**
   * Model LoyaltyTransactions
   */

  export type AggregateLoyaltyTransactions = {
    _count: LoyaltyTransactionsCountAggregateOutputType | null
    _avg: LoyaltyTransactionsAvgAggregateOutputType | null
    _sum: LoyaltyTransactionsSumAggregateOutputType | null
    _min: LoyaltyTransactionsMinAggregateOutputType | null
    _max: LoyaltyTransactionsMaxAggregateOutputType | null
  }

  export type LoyaltyTransactionsAvgAggregateOutputType = {
    points: number | null
  }

  export type LoyaltyTransactionsSumAggregateOutputType = {
    points: number | null
  }

  export type LoyaltyTransactionsMinAggregateOutputType = {
    id: string | null
    loyalty_account_id: string | null
    points: number | null
    type: $Enums.LoyaltyTransactionType | null
    transaction_id: string | null
    description: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type LoyaltyTransactionsMaxAggregateOutputType = {
    id: string | null
    loyalty_account_id: string | null
    points: number | null
    type: $Enums.LoyaltyTransactionType | null
    transaction_id: string | null
    description: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type LoyaltyTransactionsCountAggregateOutputType = {
    id: number
    loyalty_account_id: number
    points: number
    type: number
    transaction_id: number
    description: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type LoyaltyTransactionsAvgAggregateInputType = {
    points?: true
  }

  export type LoyaltyTransactionsSumAggregateInputType = {
    points?: true
  }

  export type LoyaltyTransactionsMinAggregateInputType = {
    id?: true
    loyalty_account_id?: true
    points?: true
    type?: true
    transaction_id?: true
    description?: true
    expires_at?: true
    created_at?: true
  }

  export type LoyaltyTransactionsMaxAggregateInputType = {
    id?: true
    loyalty_account_id?: true
    points?: true
    type?: true
    transaction_id?: true
    description?: true
    expires_at?: true
    created_at?: true
  }

  export type LoyaltyTransactionsCountAggregateInputType = {
    id?: true
    loyalty_account_id?: true
    points?: true
    type?: true
    transaction_id?: true
    description?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type LoyaltyTransactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyTransactions to aggregate.
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyTransactions to fetch.
     */
    orderBy?: LoyaltyTransactionsOrderByWithRelationInput | LoyaltyTransactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyTransactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyTransactions
    **/
    _count?: true | LoyaltyTransactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyTransactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyTransactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyTransactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyTransactionsMaxAggregateInputType
  }

  export type GetLoyaltyTransactionsAggregateType<T extends LoyaltyTransactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyTransactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyTransactions[P]>
      : GetScalarType<T[P], AggregateLoyaltyTransactions[P]>
  }




  export type LoyaltyTransactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyTransactionsWhereInput
    orderBy?: LoyaltyTransactionsOrderByWithAggregationInput | LoyaltyTransactionsOrderByWithAggregationInput[]
    by: LoyaltyTransactionsScalarFieldEnum[] | LoyaltyTransactionsScalarFieldEnum
    having?: LoyaltyTransactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyTransactionsCountAggregateInputType | true
    _avg?: LoyaltyTransactionsAvgAggregateInputType
    _sum?: LoyaltyTransactionsSumAggregateInputType
    _min?: LoyaltyTransactionsMinAggregateInputType
    _max?: LoyaltyTransactionsMaxAggregateInputType
  }

  export type LoyaltyTransactionsGroupByOutputType = {
    id: string
    loyalty_account_id: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id: string | null
    description: string | null
    expires_at: Date | null
    created_at: Date
    _count: LoyaltyTransactionsCountAggregateOutputType | null
    _avg: LoyaltyTransactionsAvgAggregateOutputType | null
    _sum: LoyaltyTransactionsSumAggregateOutputType | null
    _min: LoyaltyTransactionsMinAggregateOutputType | null
    _max: LoyaltyTransactionsMaxAggregateOutputType | null
  }

  type GetLoyaltyTransactionsGroupByPayload<T extends LoyaltyTransactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyTransactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyTransactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyTransactionsGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyTransactionsGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyTransactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyalty_account_id?: boolean
    points?: boolean
    type?: boolean
    transaction_id?: boolean
    description?: boolean
    expires_at?: boolean
    created_at?: boolean
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyTransactions"]>

  export type LoyaltyTransactionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyalty_account_id?: boolean
    points?: boolean
    type?: boolean
    transaction_id?: boolean
    description?: boolean
    expires_at?: boolean
    created_at?: boolean
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyTransactions"]>

  export type LoyaltyTransactionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyalty_account_id?: boolean
    points?: boolean
    type?: boolean
    transaction_id?: boolean
    description?: boolean
    expires_at?: boolean
    created_at?: boolean
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyTransactions"]>

  export type LoyaltyTransactionsSelectScalar = {
    id?: boolean
    loyalty_account_id?: boolean
    points?: boolean
    type?: boolean
    transaction_id?: boolean
    description?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type LoyaltyTransactionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loyalty_account_id" | "points" | "type" | "transaction_id" | "description" | "expires_at" | "created_at", ExtArgs["result"]["loyaltyTransactions"]>
  export type LoyaltyTransactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }
  export type LoyaltyTransactionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }
  export type LoyaltyTransactionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyalty_account?: boolean | LoyaltyAccountsDefaultArgs<ExtArgs>
  }

  export type $LoyaltyTransactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyTransactions"
    objects: {
      loyalty_account: Prisma.$LoyaltyAccountsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loyalty_account_id: string
      points: number
      type: $Enums.LoyaltyTransactionType
      transaction_id: string | null
      description: string | null
      expires_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["loyaltyTransactions"]>
    composites: {}
  }

  type LoyaltyTransactionsGetPayload<S extends boolean | null | undefined | LoyaltyTransactionsDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyTransactionsPayload, S>

  type LoyaltyTransactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyTransactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyTransactionsCountAggregateInputType | true
    }

  export interface LoyaltyTransactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyTransactions'], meta: { name: 'LoyaltyTransactions' } }
    /**
     * Find zero or one LoyaltyTransactions that matches the filter.
     * @param {LoyaltyTransactionsFindUniqueArgs} args - Arguments to find a LoyaltyTransactions
     * @example
     * // Get one LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyTransactionsFindUniqueArgs>(args: SelectSubset<T, LoyaltyTransactionsFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyTransactions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyTransactionsFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyTransactions
     * @example
     * // Get one LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyTransactionsFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyTransactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsFindFirstArgs} args - Arguments to find a LoyaltyTransactions
     * @example
     * // Get one LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyTransactionsFindFirstArgs>(args?: SelectSubset<T, LoyaltyTransactionsFindFirstArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyTransactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsFindFirstOrThrowArgs} args - Arguments to find a LoyaltyTransactions
     * @example
     * // Get one LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyTransactionsFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyTransactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findMany()
     * 
     * // Get first 10 LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyTransactionsWithIdOnly = await prisma.loyaltyTransactions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyTransactionsFindManyArgs>(args?: SelectSubset<T, LoyaltyTransactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyTransactions.
     * @param {LoyaltyTransactionsCreateArgs} args - Arguments to create a LoyaltyTransactions.
     * @example
     * // Create one LoyaltyTransactions
     * const LoyaltyTransactions = await prisma.loyaltyTransactions.create({
     *   data: {
     *     // ... data to create a LoyaltyTransactions
     *   }
     * })
     * 
     */
    create<T extends LoyaltyTransactionsCreateArgs>(args: SelectSubset<T, LoyaltyTransactionsCreateArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyTransactions.
     * @param {LoyaltyTransactionsCreateManyArgs} args - Arguments to create many LoyaltyTransactions.
     * @example
     * // Create many LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyTransactionsCreateManyArgs>(args?: SelectSubset<T, LoyaltyTransactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyTransactions and returns the data saved in the database.
     * @param {LoyaltyTransactionsCreateManyAndReturnArgs} args - Arguments to create many LoyaltyTransactions.
     * @example
     * // Create many LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyTransactions and only return the `id`
     * const loyaltyTransactionsWithIdOnly = await prisma.loyaltyTransactions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyTransactionsCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyTransactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyTransactions.
     * @param {LoyaltyTransactionsDeleteArgs} args - Arguments to delete one LoyaltyTransactions.
     * @example
     * // Delete one LoyaltyTransactions
     * const LoyaltyTransactions = await prisma.loyaltyTransactions.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyTransactions
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyTransactionsDeleteArgs>(args: SelectSubset<T, LoyaltyTransactionsDeleteArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyTransactions.
     * @param {LoyaltyTransactionsUpdateArgs} args - Arguments to update one LoyaltyTransactions.
     * @example
     * // Update one LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyTransactionsUpdateArgs>(args: SelectSubset<T, LoyaltyTransactionsUpdateArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyTransactions.
     * @param {LoyaltyTransactionsDeleteManyArgs} args - Arguments to filter LoyaltyTransactions to delete.
     * @example
     * // Delete a few LoyaltyTransactions
     * const { count } = await prisma.loyaltyTransactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyTransactionsDeleteManyArgs>(args?: SelectSubset<T, LoyaltyTransactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyTransactionsUpdateManyArgs>(args: SelectSubset<T, LoyaltyTransactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyTransactions and returns the data updated in the database.
     * @param {LoyaltyTransactionsUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyTransactions.
     * @example
     * // Update many LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyTransactions and only return the `id`
     * const loyaltyTransactionsWithIdOnly = await prisma.loyaltyTransactions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyTransactionsUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyTransactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyTransactions.
     * @param {LoyaltyTransactionsUpsertArgs} args - Arguments to update or create a LoyaltyTransactions.
     * @example
     * // Update or create a LoyaltyTransactions
     * const loyaltyTransactions = await prisma.loyaltyTransactions.upsert({
     *   create: {
     *     // ... data to create a LoyaltyTransactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyTransactions we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyTransactionsUpsertArgs>(args: SelectSubset<T, LoyaltyTransactionsUpsertArgs<ExtArgs>>): Prisma__LoyaltyTransactionsClient<$Result.GetResult<Prisma.$LoyaltyTransactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsCountArgs} args - Arguments to filter LoyaltyTransactions to count.
     * @example
     * // Count the number of LoyaltyTransactions
     * const count = await prisma.loyaltyTransactions.count({
     *   where: {
     *     // ... the filter for the LoyaltyTransactions we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyTransactionsCountArgs>(
      args?: Subset<T, LoyaltyTransactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyTransactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyTransactionsAggregateArgs>(args: Subset<T, LoyaltyTransactionsAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyTransactionsAggregateType<T>>

    /**
     * Group by LoyaltyTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyTransactionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyTransactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyTransactionsGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyTransactionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyTransactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyTransactions model
   */
  readonly fields: LoyaltyTransactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyTransactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyTransactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loyalty_account<T extends LoyaltyAccountsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyAccountsDefaultArgs<ExtArgs>>): Prisma__LoyaltyAccountsClient<$Result.GetResult<Prisma.$LoyaltyAccountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyTransactions model
   */
  interface LoyaltyTransactionsFieldRefs {
    readonly id: FieldRef<"LoyaltyTransactions", 'String'>
    readonly loyalty_account_id: FieldRef<"LoyaltyTransactions", 'String'>
    readonly points: FieldRef<"LoyaltyTransactions", 'Int'>
    readonly type: FieldRef<"LoyaltyTransactions", 'LoyaltyTransactionType'>
    readonly transaction_id: FieldRef<"LoyaltyTransactions", 'String'>
    readonly description: FieldRef<"LoyaltyTransactions", 'String'>
    readonly expires_at: FieldRef<"LoyaltyTransactions", 'DateTime'>
    readonly created_at: FieldRef<"LoyaltyTransactions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyTransactions findUnique
   */
  export type LoyaltyTransactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyTransactions to fetch.
     */
    where: LoyaltyTransactionsWhereUniqueInput
  }

  /**
   * LoyaltyTransactions findUniqueOrThrow
   */
  export type LoyaltyTransactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyTransactions to fetch.
     */
    where: LoyaltyTransactionsWhereUniqueInput
  }

  /**
   * LoyaltyTransactions findFirst
   */
  export type LoyaltyTransactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyTransactions to fetch.
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyTransactions to fetch.
     */
    orderBy?: LoyaltyTransactionsOrderByWithRelationInput | LoyaltyTransactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyTransactions.
     */
    cursor?: LoyaltyTransactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyTransactions.
     */
    distinct?: LoyaltyTransactionsScalarFieldEnum | LoyaltyTransactionsScalarFieldEnum[]
  }

  /**
   * LoyaltyTransactions findFirstOrThrow
   */
  export type LoyaltyTransactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyTransactions to fetch.
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyTransactions to fetch.
     */
    orderBy?: LoyaltyTransactionsOrderByWithRelationInput | LoyaltyTransactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyTransactions.
     */
    cursor?: LoyaltyTransactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyTransactions.
     */
    distinct?: LoyaltyTransactionsScalarFieldEnum | LoyaltyTransactionsScalarFieldEnum[]
  }

  /**
   * LoyaltyTransactions findMany
   */
  export type LoyaltyTransactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyTransactions to fetch.
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyTransactions to fetch.
     */
    orderBy?: LoyaltyTransactionsOrderByWithRelationInput | LoyaltyTransactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyTransactions.
     */
    cursor?: LoyaltyTransactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyTransactions.
     */
    skip?: number
    distinct?: LoyaltyTransactionsScalarFieldEnum | LoyaltyTransactionsScalarFieldEnum[]
  }

  /**
   * LoyaltyTransactions create
   */
  export type LoyaltyTransactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyTransactions.
     */
    data: XOR<LoyaltyTransactionsCreateInput, LoyaltyTransactionsUncheckedCreateInput>
  }

  /**
   * LoyaltyTransactions createMany
   */
  export type LoyaltyTransactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyTransactions.
     */
    data: LoyaltyTransactionsCreateManyInput | LoyaltyTransactionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyTransactions createManyAndReturn
   */
  export type LoyaltyTransactionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyTransactions.
     */
    data: LoyaltyTransactionsCreateManyInput | LoyaltyTransactionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyTransactions update
   */
  export type LoyaltyTransactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyTransactions.
     */
    data: XOR<LoyaltyTransactionsUpdateInput, LoyaltyTransactionsUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyTransactions to update.
     */
    where: LoyaltyTransactionsWhereUniqueInput
  }

  /**
   * LoyaltyTransactions updateMany
   */
  export type LoyaltyTransactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyTransactions.
     */
    data: XOR<LoyaltyTransactionsUpdateManyMutationInput, LoyaltyTransactionsUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyTransactions to update
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * Limit how many LoyaltyTransactions to update.
     */
    limit?: number
  }

  /**
   * LoyaltyTransactions updateManyAndReturn
   */
  export type LoyaltyTransactionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyTransactions.
     */
    data: XOR<LoyaltyTransactionsUpdateManyMutationInput, LoyaltyTransactionsUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyTransactions to update
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * Limit how many LoyaltyTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyTransactions upsert
   */
  export type LoyaltyTransactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyTransactions to update in case it exists.
     */
    where: LoyaltyTransactionsWhereUniqueInput
    /**
     * In case the LoyaltyTransactions found by the `where` argument doesn't exist, create a new LoyaltyTransactions with this data.
     */
    create: XOR<LoyaltyTransactionsCreateInput, LoyaltyTransactionsUncheckedCreateInput>
    /**
     * In case the LoyaltyTransactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyTransactionsUpdateInput, LoyaltyTransactionsUncheckedUpdateInput>
  }

  /**
   * LoyaltyTransactions delete
   */
  export type LoyaltyTransactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyTransactions to delete.
     */
    where: LoyaltyTransactionsWhereUniqueInput
  }

  /**
   * LoyaltyTransactions deleteMany
   */
  export type LoyaltyTransactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyTransactions to delete
     */
    where?: LoyaltyTransactionsWhereInput
    /**
     * Limit how many LoyaltyTransactions to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyTransactions without action
   */
  export type LoyaltyTransactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyTransactions
     */
    select?: LoyaltyTransactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyTransactions
     */
    omit?: LoyaltyTransactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyTransactionsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BookingsScalarFieldEnum: {
    id: 'id',
    booking_code: 'booking_code',
    user_id: 'user_id',
    showtime_id: 'showtime_id',
    customer_name: 'customer_name',
    customer_email: 'customer_email',
    customer_phone: 'customer_phone',
    subtotal: 'subtotal',
    discount: 'discount',
    points_used: 'points_used',
    points_discount: 'points_discount',
    final_amount: 'final_amount',
    promotion_code: 'promotion_code',
    status: 'status',
    payment_status: 'payment_status',
    expires_at: 'expires_at',
    cancelled_at: 'cancelled_at',
    cancellation_reason: 'cancellation_reason',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BookingsScalarFieldEnum = (typeof BookingsScalarFieldEnum)[keyof typeof BookingsScalarFieldEnum]


  export const TicketsScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    seat_id: 'seat_id',
    ticket_code: 'ticket_code',
    qr_code: 'qr_code',
    barcode: 'barcode',
    ticket_type: 'ticket_type',
    price: 'price',
    status: 'status',
    used_at: 'used_at',
    created_at: 'created_at'
  };

  export type TicketsScalarFieldEnum = (typeof TicketsScalarFieldEnum)[keyof typeof TicketsScalarFieldEnum]


  export const PaymentsScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    amount: 'amount',
    payment_method: 'payment_method',
    status: 'status',
    transaction_id: 'transaction_id',
    provider_transaction_id: 'provider_transaction_id',
    payment_url: 'payment_url',
    paid_at: 'paid_at',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PaymentsScalarFieldEnum = (typeof PaymentsScalarFieldEnum)[keyof typeof PaymentsScalarFieldEnum]


  export const RefundsScalarFieldEnum: {
    id: 'id',
    payment_id: 'payment_id',
    amount: 'amount',
    reason: 'reason',
    status: 'status',
    refunded_at: 'refunded_at',
    created_at: 'created_at'
  };

  export type RefundsScalarFieldEnum = (typeof RefundsScalarFieldEnum)[keyof typeof RefundsScalarFieldEnum]


  export const ConcessionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    name_en: 'name_en',
    description: 'description',
    category: 'category',
    price: 'price',
    image_url: 'image_url',
    available: 'available',
    inventory: 'inventory',
    cinema_id: 'cinema_id',
    nutrition_info: 'nutrition_info',
    allergens: 'allergens',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ConcessionsScalarFieldEnum = (typeof ConcessionsScalarFieldEnum)[keyof typeof ConcessionsScalarFieldEnum]


  export const BookingConcessionsScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    concession_id: 'concession_id',
    quantity: 'quantity',
    unit_price: 'unit_price',
    total_price: 'total_price',
    created_at: 'created_at'
  };

  export type BookingConcessionsScalarFieldEnum = (typeof BookingConcessionsScalarFieldEnum)[keyof typeof BookingConcessionsScalarFieldEnum]


  export const PromotionsScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    type: 'type',
    value: 'value',
    min_purchase: 'min_purchase',
    max_discount: 'max_discount',
    valid_from: 'valid_from',
    valid_to: 'valid_to',
    usage_limit: 'usage_limit',
    usage_per_user: 'usage_per_user',
    current_usage: 'current_usage',
    applicable_for: 'applicable_for',
    conditions: 'conditions',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PromotionsScalarFieldEnum = (typeof PromotionsScalarFieldEnum)[keyof typeof PromotionsScalarFieldEnum]


  export const LoyaltyAccountsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    current_points: 'current_points',
    tier: 'tier',
    total_spent: 'total_spent',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LoyaltyAccountsScalarFieldEnum = (typeof LoyaltyAccountsScalarFieldEnum)[keyof typeof LoyaltyAccountsScalarFieldEnum]


  export const LoyaltyTransactionsScalarFieldEnum: {
    id: 'id',
    loyalty_account_id: 'loyalty_account_id',
    points: 'points',
    type: 'type',
    transaction_id: 'transaction_id',
    description: 'description',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type LoyaltyTransactionsScalarFieldEnum = (typeof LoyaltyTransactionsScalarFieldEnum)[keyof typeof LoyaltyTransactionsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'RefundStatus'
   */
  export type EnumRefundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundStatus'>
    


  /**
   * Reference to a field of type 'RefundStatus[]'
   */
  export type ListEnumRefundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundStatus[]'>
    


  /**
   * Reference to a field of type 'ConcessionCategory'
   */
  export type EnumConcessionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConcessionCategory'>
    


  /**
   * Reference to a field of type 'ConcessionCategory[]'
   */
  export type ListEnumConcessionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConcessionCategory[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PromotionType'
   */
  export type EnumPromotionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionType'>
    


  /**
   * Reference to a field of type 'PromotionType[]'
   */
  export type ListEnumPromotionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionType[]'>
    


  /**
   * Reference to a field of type 'LoyaltyTier'
   */
  export type EnumLoyaltyTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyTier'>
    


  /**
   * Reference to a field of type 'LoyaltyTier[]'
   */
  export type ListEnumLoyaltyTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyTier[]'>
    


  /**
   * Reference to a field of type 'LoyaltyTransactionType'
   */
  export type EnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyTransactionType'>
    


  /**
   * Reference to a field of type 'LoyaltyTransactionType[]'
   */
  export type ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyTransactionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BookingsWhereInput = {
    AND?: BookingsWhereInput | BookingsWhereInput[]
    OR?: BookingsWhereInput[]
    NOT?: BookingsWhereInput | BookingsWhereInput[]
    id?: UuidFilter<"Bookings"> | string
    booking_code?: StringFilter<"Bookings"> | string
    user_id?: StringFilter<"Bookings"> | string
    showtime_id?: UuidFilter<"Bookings"> | string
    customer_name?: StringFilter<"Bookings"> | string
    customer_email?: StringFilter<"Bookings"> | string
    customer_phone?: StringNullableFilter<"Bookings"> | string | null
    subtotal?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    points_used?: IntFilter<"Bookings"> | number
    points_discount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    promotion_code?: StringNullableFilter<"Bookings"> | string | null
    status?: EnumBookingStatusFilter<"Bookings"> | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFilter<"Bookings"> | $Enums.PaymentStatus
    expires_at?: DateTimeNullableFilter<"Bookings"> | Date | string | null
    cancelled_at?: DateTimeNullableFilter<"Bookings"> | Date | string | null
    cancellation_reason?: StringNullableFilter<"Bookings"> | string | null
    created_at?: DateTimeFilter<"Bookings"> | Date | string
    updated_at?: DateTimeFilter<"Bookings"> | Date | string
    tickets?: TicketsListRelationFilter
    payments?: PaymentsListRelationFilter
    booking_concessions?: BookingConcessionsListRelationFilter
  }

  export type BookingsOrderByWithRelationInput = {
    id?: SortOrder
    booking_code?: SortOrder
    user_id?: SortOrder
    showtime_id?: SortOrder
    customer_name?: SortOrder
    customer_email?: SortOrder
    customer_phone?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
    promotion_code?: SortOrderInput | SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    cancelled_at?: SortOrderInput | SortOrder
    cancellation_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tickets?: TicketsOrderByRelationAggregateInput
    payments?: PaymentsOrderByRelationAggregateInput
    booking_concessions?: BookingConcessionsOrderByRelationAggregateInput
  }

  export type BookingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    booking_code?: string
    AND?: BookingsWhereInput | BookingsWhereInput[]
    OR?: BookingsWhereInput[]
    NOT?: BookingsWhereInput | BookingsWhereInput[]
    user_id?: StringFilter<"Bookings"> | string
    showtime_id?: UuidFilter<"Bookings"> | string
    customer_name?: StringFilter<"Bookings"> | string
    customer_email?: StringFilter<"Bookings"> | string
    customer_phone?: StringNullableFilter<"Bookings"> | string | null
    subtotal?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    points_used?: IntFilter<"Bookings"> | number
    points_discount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    promotion_code?: StringNullableFilter<"Bookings"> | string | null
    status?: EnumBookingStatusFilter<"Bookings"> | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFilter<"Bookings"> | $Enums.PaymentStatus
    expires_at?: DateTimeNullableFilter<"Bookings"> | Date | string | null
    cancelled_at?: DateTimeNullableFilter<"Bookings"> | Date | string | null
    cancellation_reason?: StringNullableFilter<"Bookings"> | string | null
    created_at?: DateTimeFilter<"Bookings"> | Date | string
    updated_at?: DateTimeFilter<"Bookings"> | Date | string
    tickets?: TicketsListRelationFilter
    payments?: PaymentsListRelationFilter
    booking_concessions?: BookingConcessionsListRelationFilter
  }, "id" | "booking_code">

  export type BookingsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_code?: SortOrder
    user_id?: SortOrder
    showtime_id?: SortOrder
    customer_name?: SortOrder
    customer_email?: SortOrder
    customer_phone?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
    promotion_code?: SortOrderInput | SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    cancelled_at?: SortOrderInput | SortOrder
    cancellation_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BookingsCountOrderByAggregateInput
    _avg?: BookingsAvgOrderByAggregateInput
    _max?: BookingsMaxOrderByAggregateInput
    _min?: BookingsMinOrderByAggregateInput
    _sum?: BookingsSumOrderByAggregateInput
  }

  export type BookingsScalarWhereWithAggregatesInput = {
    AND?: BookingsScalarWhereWithAggregatesInput | BookingsScalarWhereWithAggregatesInput[]
    OR?: BookingsScalarWhereWithAggregatesInput[]
    NOT?: BookingsScalarWhereWithAggregatesInput | BookingsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Bookings"> | string
    booking_code?: StringWithAggregatesFilter<"Bookings"> | string
    user_id?: StringWithAggregatesFilter<"Bookings"> | string
    showtime_id?: UuidWithAggregatesFilter<"Bookings"> | string
    customer_name?: StringWithAggregatesFilter<"Bookings"> | string
    customer_email?: StringWithAggregatesFilter<"Bookings"> | string
    customer_phone?: StringNullableWithAggregatesFilter<"Bookings"> | string | null
    subtotal?: DecimalWithAggregatesFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    discount?: DecimalWithAggregatesFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    points_used?: IntWithAggregatesFilter<"Bookings"> | number
    points_discount?: DecimalWithAggregatesFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalWithAggregatesFilter<"Bookings"> | Decimal | DecimalJsLike | number | string
    promotion_code?: StringNullableWithAggregatesFilter<"Bookings"> | string | null
    status?: EnumBookingStatusWithAggregatesFilter<"Bookings"> | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusWithAggregatesFilter<"Bookings"> | $Enums.PaymentStatus
    expires_at?: DateTimeNullableWithAggregatesFilter<"Bookings"> | Date | string | null
    cancelled_at?: DateTimeNullableWithAggregatesFilter<"Bookings"> | Date | string | null
    cancellation_reason?: StringNullableWithAggregatesFilter<"Bookings"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Bookings"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Bookings"> | Date | string
  }

  export type TicketsWhereInput = {
    AND?: TicketsWhereInput | TicketsWhereInput[]
    OR?: TicketsWhereInput[]
    NOT?: TicketsWhereInput | TicketsWhereInput[]
    id?: UuidFilter<"Tickets"> | string
    booking_id?: UuidFilter<"Tickets"> | string
    seat_id?: UuidFilter<"Tickets"> | string
    ticket_code?: StringFilter<"Tickets"> | string
    qr_code?: StringNullableFilter<"Tickets"> | string | null
    barcode?: StringNullableFilter<"Tickets"> | string | null
    ticket_type?: StringFilter<"Tickets"> | string
    price?: DecimalFilter<"Tickets"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Tickets"> | $Enums.TicketStatus
    used_at?: DateTimeNullableFilter<"Tickets"> | Date | string | null
    created_at?: DateTimeFilter<"Tickets"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
  }

  export type TicketsOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    ticket_code?: SortOrder
    qr_code?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    ticket_type?: SortOrder
    price?: SortOrder
    status?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    booking?: BookingsOrderByWithRelationInput
  }

  export type TicketsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ticket_code?: string
    AND?: TicketsWhereInput | TicketsWhereInput[]
    OR?: TicketsWhereInput[]
    NOT?: TicketsWhereInput | TicketsWhereInput[]
    booking_id?: UuidFilter<"Tickets"> | string
    seat_id?: UuidFilter<"Tickets"> | string
    qr_code?: StringNullableFilter<"Tickets"> | string | null
    barcode?: StringNullableFilter<"Tickets"> | string | null
    ticket_type?: StringFilter<"Tickets"> | string
    price?: DecimalFilter<"Tickets"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Tickets"> | $Enums.TicketStatus
    used_at?: DateTimeNullableFilter<"Tickets"> | Date | string | null
    created_at?: DateTimeFilter<"Tickets"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
  }, "id" | "ticket_code">

  export type TicketsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    ticket_code?: SortOrder
    qr_code?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    ticket_type?: SortOrder
    price?: SortOrder
    status?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: TicketsCountOrderByAggregateInput
    _avg?: TicketsAvgOrderByAggregateInput
    _max?: TicketsMaxOrderByAggregateInput
    _min?: TicketsMinOrderByAggregateInput
    _sum?: TicketsSumOrderByAggregateInput
  }

  export type TicketsScalarWhereWithAggregatesInput = {
    AND?: TicketsScalarWhereWithAggregatesInput | TicketsScalarWhereWithAggregatesInput[]
    OR?: TicketsScalarWhereWithAggregatesInput[]
    NOT?: TicketsScalarWhereWithAggregatesInput | TicketsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Tickets"> | string
    booking_id?: UuidWithAggregatesFilter<"Tickets"> | string
    seat_id?: UuidWithAggregatesFilter<"Tickets"> | string
    ticket_code?: StringWithAggregatesFilter<"Tickets"> | string
    qr_code?: StringNullableWithAggregatesFilter<"Tickets"> | string | null
    barcode?: StringNullableWithAggregatesFilter<"Tickets"> | string | null
    ticket_type?: StringWithAggregatesFilter<"Tickets"> | string
    price?: DecimalWithAggregatesFilter<"Tickets"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusWithAggregatesFilter<"Tickets"> | $Enums.TicketStatus
    used_at?: DateTimeNullableWithAggregatesFilter<"Tickets"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Tickets"> | Date | string
  }

  export type PaymentsWhereInput = {
    AND?: PaymentsWhereInput | PaymentsWhereInput[]
    OR?: PaymentsWhereInput[]
    NOT?: PaymentsWhereInput | PaymentsWhereInput[]
    id?: UuidFilter<"Payments"> | string
    booking_id?: UuidFilter<"Payments"> | string
    amount?: DecimalFilter<"Payments"> | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFilter<"Payments"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payments"> | $Enums.PaymentStatus
    transaction_id?: StringNullableFilter<"Payments"> | string | null
    provider_transaction_id?: StringNullableFilter<"Payments"> | string | null
    payment_url?: StringNullableFilter<"Payments"> | string | null
    paid_at?: DateTimeNullableFilter<"Payments"> | Date | string | null
    metadata?: JsonNullableFilter<"Payments">
    created_at?: DateTimeFilter<"Payments"> | Date | string
    updated_at?: DateTimeFilter<"Payments"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
    refunds?: RefundsListRelationFilter
  }

  export type PaymentsOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    provider_transaction_id?: SortOrderInput | SortOrder
    payment_url?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    booking?: BookingsOrderByWithRelationInput
    refunds?: RefundsOrderByRelationAggregateInput
  }

  export type PaymentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transaction_id?: string
    AND?: PaymentsWhereInput | PaymentsWhereInput[]
    OR?: PaymentsWhereInput[]
    NOT?: PaymentsWhereInput | PaymentsWhereInput[]
    booking_id?: UuidFilter<"Payments"> | string
    amount?: DecimalFilter<"Payments"> | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFilter<"Payments"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payments"> | $Enums.PaymentStatus
    provider_transaction_id?: StringNullableFilter<"Payments"> | string | null
    payment_url?: StringNullableFilter<"Payments"> | string | null
    paid_at?: DateTimeNullableFilter<"Payments"> | Date | string | null
    metadata?: JsonNullableFilter<"Payments">
    created_at?: DateTimeFilter<"Payments"> | Date | string
    updated_at?: DateTimeFilter<"Payments"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
    refunds?: RefundsListRelationFilter
  }, "id" | "transaction_id">

  export type PaymentsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    provider_transaction_id?: SortOrderInput | SortOrder
    payment_url?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PaymentsCountOrderByAggregateInput
    _avg?: PaymentsAvgOrderByAggregateInput
    _max?: PaymentsMaxOrderByAggregateInput
    _min?: PaymentsMinOrderByAggregateInput
    _sum?: PaymentsSumOrderByAggregateInput
  }

  export type PaymentsScalarWhereWithAggregatesInput = {
    AND?: PaymentsScalarWhereWithAggregatesInput | PaymentsScalarWhereWithAggregatesInput[]
    OR?: PaymentsScalarWhereWithAggregatesInput[]
    NOT?: PaymentsScalarWhereWithAggregatesInput | PaymentsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Payments"> | string
    booking_id?: UuidWithAggregatesFilter<"Payments"> | string
    amount?: DecimalWithAggregatesFilter<"Payments"> | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodWithAggregatesFilter<"Payments"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusWithAggregatesFilter<"Payments"> | $Enums.PaymentStatus
    transaction_id?: StringNullableWithAggregatesFilter<"Payments"> | string | null
    provider_transaction_id?: StringNullableWithAggregatesFilter<"Payments"> | string | null
    payment_url?: StringNullableWithAggregatesFilter<"Payments"> | string | null
    paid_at?: DateTimeNullableWithAggregatesFilter<"Payments"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Payments">
    created_at?: DateTimeWithAggregatesFilter<"Payments"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Payments"> | Date | string
  }

  export type RefundsWhereInput = {
    AND?: RefundsWhereInput | RefundsWhereInput[]
    OR?: RefundsWhereInput[]
    NOT?: RefundsWhereInput | RefundsWhereInput[]
    id?: UuidFilter<"Refunds"> | string
    payment_id?: UuidFilter<"Refunds"> | string
    amount?: DecimalFilter<"Refunds"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"Refunds"> | string
    status?: EnumRefundStatusFilter<"Refunds"> | $Enums.RefundStatus
    refunded_at?: DateTimeNullableFilter<"Refunds"> | Date | string | null
    created_at?: DateTimeFilter<"Refunds"> | Date | string
    payment?: XOR<PaymentsScalarRelationFilter, PaymentsWhereInput>
  }

  export type RefundsOrderByWithRelationInput = {
    id?: SortOrder
    payment_id?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    refunded_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    payment?: PaymentsOrderByWithRelationInput
  }

  export type RefundsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RefundsWhereInput | RefundsWhereInput[]
    OR?: RefundsWhereInput[]
    NOT?: RefundsWhereInput | RefundsWhereInput[]
    payment_id?: UuidFilter<"Refunds"> | string
    amount?: DecimalFilter<"Refunds"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"Refunds"> | string
    status?: EnumRefundStatusFilter<"Refunds"> | $Enums.RefundStatus
    refunded_at?: DateTimeNullableFilter<"Refunds"> | Date | string | null
    created_at?: DateTimeFilter<"Refunds"> | Date | string
    payment?: XOR<PaymentsScalarRelationFilter, PaymentsWhereInput>
  }, "id">

  export type RefundsOrderByWithAggregationInput = {
    id?: SortOrder
    payment_id?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    refunded_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: RefundsCountOrderByAggregateInput
    _avg?: RefundsAvgOrderByAggregateInput
    _max?: RefundsMaxOrderByAggregateInput
    _min?: RefundsMinOrderByAggregateInput
    _sum?: RefundsSumOrderByAggregateInput
  }

  export type RefundsScalarWhereWithAggregatesInput = {
    AND?: RefundsScalarWhereWithAggregatesInput | RefundsScalarWhereWithAggregatesInput[]
    OR?: RefundsScalarWhereWithAggregatesInput[]
    NOT?: RefundsScalarWhereWithAggregatesInput | RefundsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Refunds"> | string
    payment_id?: UuidWithAggregatesFilter<"Refunds"> | string
    amount?: DecimalWithAggregatesFilter<"Refunds"> | Decimal | DecimalJsLike | number | string
    reason?: StringWithAggregatesFilter<"Refunds"> | string
    status?: EnumRefundStatusWithAggregatesFilter<"Refunds"> | $Enums.RefundStatus
    refunded_at?: DateTimeNullableWithAggregatesFilter<"Refunds"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Refunds"> | Date | string
  }

  export type ConcessionsWhereInput = {
    AND?: ConcessionsWhereInput | ConcessionsWhereInput[]
    OR?: ConcessionsWhereInput[]
    NOT?: ConcessionsWhereInput | ConcessionsWhereInput[]
    id?: UuidFilter<"Concessions"> | string
    name?: StringFilter<"Concessions"> | string
    name_en?: StringNullableFilter<"Concessions"> | string | null
    description?: StringNullableFilter<"Concessions"> | string | null
    category?: EnumConcessionCategoryFilter<"Concessions"> | $Enums.ConcessionCategory
    price?: DecimalFilter<"Concessions"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableFilter<"Concessions"> | string | null
    available?: BoolFilter<"Concessions"> | boolean
    inventory?: IntNullableFilter<"Concessions"> | number | null
    cinema_id?: UuidNullableFilter<"Concessions"> | string | null
    nutrition_info?: JsonNullableFilter<"Concessions">
    allergens?: StringNullableListFilter<"Concessions">
    created_at?: DateTimeFilter<"Concessions"> | Date | string
    updated_at?: DateTimeFilter<"Concessions"> | Date | string
    booking_concessions?: BookingConcessionsListRelationFilter
  }

  export type ConcessionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    name_en?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    price?: SortOrder
    image_url?: SortOrderInput | SortOrder
    available?: SortOrder
    inventory?: SortOrderInput | SortOrder
    cinema_id?: SortOrderInput | SortOrder
    nutrition_info?: SortOrderInput | SortOrder
    allergens?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    booking_concessions?: BookingConcessionsOrderByRelationAggregateInput
  }

  export type ConcessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConcessionsWhereInput | ConcessionsWhereInput[]
    OR?: ConcessionsWhereInput[]
    NOT?: ConcessionsWhereInput | ConcessionsWhereInput[]
    name?: StringFilter<"Concessions"> | string
    name_en?: StringNullableFilter<"Concessions"> | string | null
    description?: StringNullableFilter<"Concessions"> | string | null
    category?: EnumConcessionCategoryFilter<"Concessions"> | $Enums.ConcessionCategory
    price?: DecimalFilter<"Concessions"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableFilter<"Concessions"> | string | null
    available?: BoolFilter<"Concessions"> | boolean
    inventory?: IntNullableFilter<"Concessions"> | number | null
    cinema_id?: UuidNullableFilter<"Concessions"> | string | null
    nutrition_info?: JsonNullableFilter<"Concessions">
    allergens?: StringNullableListFilter<"Concessions">
    created_at?: DateTimeFilter<"Concessions"> | Date | string
    updated_at?: DateTimeFilter<"Concessions"> | Date | string
    booking_concessions?: BookingConcessionsListRelationFilter
  }, "id">

  export type ConcessionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    name_en?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    price?: SortOrder
    image_url?: SortOrderInput | SortOrder
    available?: SortOrder
    inventory?: SortOrderInput | SortOrder
    cinema_id?: SortOrderInput | SortOrder
    nutrition_info?: SortOrderInput | SortOrder
    allergens?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ConcessionsCountOrderByAggregateInput
    _avg?: ConcessionsAvgOrderByAggregateInput
    _max?: ConcessionsMaxOrderByAggregateInput
    _min?: ConcessionsMinOrderByAggregateInput
    _sum?: ConcessionsSumOrderByAggregateInput
  }

  export type ConcessionsScalarWhereWithAggregatesInput = {
    AND?: ConcessionsScalarWhereWithAggregatesInput | ConcessionsScalarWhereWithAggregatesInput[]
    OR?: ConcessionsScalarWhereWithAggregatesInput[]
    NOT?: ConcessionsScalarWhereWithAggregatesInput | ConcessionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Concessions"> | string
    name?: StringWithAggregatesFilter<"Concessions"> | string
    name_en?: StringNullableWithAggregatesFilter<"Concessions"> | string | null
    description?: StringNullableWithAggregatesFilter<"Concessions"> | string | null
    category?: EnumConcessionCategoryWithAggregatesFilter<"Concessions"> | $Enums.ConcessionCategory
    price?: DecimalWithAggregatesFilter<"Concessions"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableWithAggregatesFilter<"Concessions"> | string | null
    available?: BoolWithAggregatesFilter<"Concessions"> | boolean
    inventory?: IntNullableWithAggregatesFilter<"Concessions"> | number | null
    cinema_id?: UuidNullableWithAggregatesFilter<"Concessions"> | string | null
    nutrition_info?: JsonNullableWithAggregatesFilter<"Concessions">
    allergens?: StringNullableListFilter<"Concessions">
    created_at?: DateTimeWithAggregatesFilter<"Concessions"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Concessions"> | Date | string
  }

  export type BookingConcessionsWhereInput = {
    AND?: BookingConcessionsWhereInput | BookingConcessionsWhereInput[]
    OR?: BookingConcessionsWhereInput[]
    NOT?: BookingConcessionsWhereInput | BookingConcessionsWhereInput[]
    id?: UuidFilter<"BookingConcessions"> | string
    booking_id?: UuidFilter<"BookingConcessions"> | string
    concession_id?: UuidFilter<"BookingConcessions"> | string
    quantity?: IntFilter<"BookingConcessions"> | number
    unit_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"BookingConcessions"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
    concession?: XOR<ConcessionsScalarRelationFilter, ConcessionsWhereInput>
  }

  export type BookingConcessionsOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    concession_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
    created_at?: SortOrder
    booking?: BookingsOrderByWithRelationInput
    concession?: ConcessionsOrderByWithRelationInput
  }

  export type BookingConcessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingConcessionsWhereInput | BookingConcessionsWhereInput[]
    OR?: BookingConcessionsWhereInput[]
    NOT?: BookingConcessionsWhereInput | BookingConcessionsWhereInput[]
    booking_id?: UuidFilter<"BookingConcessions"> | string
    concession_id?: UuidFilter<"BookingConcessions"> | string
    quantity?: IntFilter<"BookingConcessions"> | number
    unit_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"BookingConcessions"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, BookingsWhereInput>
    concession?: XOR<ConcessionsScalarRelationFilter, ConcessionsWhereInput>
  }, "id">

  export type BookingConcessionsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    concession_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
    created_at?: SortOrder
    _count?: BookingConcessionsCountOrderByAggregateInput
    _avg?: BookingConcessionsAvgOrderByAggregateInput
    _max?: BookingConcessionsMaxOrderByAggregateInput
    _min?: BookingConcessionsMinOrderByAggregateInput
    _sum?: BookingConcessionsSumOrderByAggregateInput
  }

  export type BookingConcessionsScalarWhereWithAggregatesInput = {
    AND?: BookingConcessionsScalarWhereWithAggregatesInput | BookingConcessionsScalarWhereWithAggregatesInput[]
    OR?: BookingConcessionsScalarWhereWithAggregatesInput[]
    NOT?: BookingConcessionsScalarWhereWithAggregatesInput | BookingConcessionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BookingConcessions"> | string
    booking_id?: UuidWithAggregatesFilter<"BookingConcessions"> | string
    concession_id?: UuidWithAggregatesFilter<"BookingConcessions"> | string
    quantity?: IntWithAggregatesFilter<"BookingConcessions"> | number
    unit_price?: DecimalWithAggregatesFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    total_price?: DecimalWithAggregatesFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"BookingConcessions"> | Date | string
  }

  export type PromotionsWhereInput = {
    AND?: PromotionsWhereInput | PromotionsWhereInput[]
    OR?: PromotionsWhereInput[]
    NOT?: PromotionsWhereInput | PromotionsWhereInput[]
    id?: UuidFilter<"Promotions"> | string
    code?: StringFilter<"Promotions"> | string
    name?: StringFilter<"Promotions"> | string
    description?: StringNullableFilter<"Promotions"> | string | null
    type?: EnumPromotionTypeFilter<"Promotions"> | $Enums.PromotionType
    value?: DecimalFilter<"Promotions"> | Decimal | DecimalJsLike | number | string
    min_purchase?: DecimalNullableFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    max_discount?: DecimalNullableFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFilter<"Promotions"> | Date | string
    valid_to?: DateTimeFilter<"Promotions"> | Date | string
    usage_limit?: IntNullableFilter<"Promotions"> | number | null
    usage_per_user?: IntNullableFilter<"Promotions"> | number | null
    current_usage?: IntFilter<"Promotions"> | number
    applicable_for?: StringNullableListFilter<"Promotions">
    conditions?: JsonNullableFilter<"Promotions">
    active?: BoolFilter<"Promotions"> | boolean
    created_at?: DateTimeFilter<"Promotions"> | Date | string
    updated_at?: DateTimeFilter<"Promotions"> | Date | string
  }

  export type PromotionsOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    value?: SortOrder
    min_purchase?: SortOrderInput | SortOrder
    max_discount?: SortOrderInput | SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    usage_limit?: SortOrderInput | SortOrder
    usage_per_user?: SortOrderInput | SortOrder
    current_usage?: SortOrder
    applicable_for?: SortOrder
    conditions?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PromotionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PromotionsWhereInput | PromotionsWhereInput[]
    OR?: PromotionsWhereInput[]
    NOT?: PromotionsWhereInput | PromotionsWhereInput[]
    name?: StringFilter<"Promotions"> | string
    description?: StringNullableFilter<"Promotions"> | string | null
    type?: EnumPromotionTypeFilter<"Promotions"> | $Enums.PromotionType
    value?: DecimalFilter<"Promotions"> | Decimal | DecimalJsLike | number | string
    min_purchase?: DecimalNullableFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    max_discount?: DecimalNullableFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFilter<"Promotions"> | Date | string
    valid_to?: DateTimeFilter<"Promotions"> | Date | string
    usage_limit?: IntNullableFilter<"Promotions"> | number | null
    usage_per_user?: IntNullableFilter<"Promotions"> | number | null
    current_usage?: IntFilter<"Promotions"> | number
    applicable_for?: StringNullableListFilter<"Promotions">
    conditions?: JsonNullableFilter<"Promotions">
    active?: BoolFilter<"Promotions"> | boolean
    created_at?: DateTimeFilter<"Promotions"> | Date | string
    updated_at?: DateTimeFilter<"Promotions"> | Date | string
  }, "id" | "code">

  export type PromotionsOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    value?: SortOrder
    min_purchase?: SortOrderInput | SortOrder
    max_discount?: SortOrderInput | SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    usage_limit?: SortOrderInput | SortOrder
    usage_per_user?: SortOrderInput | SortOrder
    current_usage?: SortOrder
    applicable_for?: SortOrder
    conditions?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PromotionsCountOrderByAggregateInput
    _avg?: PromotionsAvgOrderByAggregateInput
    _max?: PromotionsMaxOrderByAggregateInput
    _min?: PromotionsMinOrderByAggregateInput
    _sum?: PromotionsSumOrderByAggregateInput
  }

  export type PromotionsScalarWhereWithAggregatesInput = {
    AND?: PromotionsScalarWhereWithAggregatesInput | PromotionsScalarWhereWithAggregatesInput[]
    OR?: PromotionsScalarWhereWithAggregatesInput[]
    NOT?: PromotionsScalarWhereWithAggregatesInput | PromotionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Promotions"> | string
    code?: StringWithAggregatesFilter<"Promotions"> | string
    name?: StringWithAggregatesFilter<"Promotions"> | string
    description?: StringNullableWithAggregatesFilter<"Promotions"> | string | null
    type?: EnumPromotionTypeWithAggregatesFilter<"Promotions"> | $Enums.PromotionType
    value?: DecimalWithAggregatesFilter<"Promotions"> | Decimal | DecimalJsLike | number | string
    min_purchase?: DecimalNullableWithAggregatesFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    max_discount?: DecimalNullableWithAggregatesFilter<"Promotions"> | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeWithAggregatesFilter<"Promotions"> | Date | string
    valid_to?: DateTimeWithAggregatesFilter<"Promotions"> | Date | string
    usage_limit?: IntNullableWithAggregatesFilter<"Promotions"> | number | null
    usage_per_user?: IntNullableWithAggregatesFilter<"Promotions"> | number | null
    current_usage?: IntWithAggregatesFilter<"Promotions"> | number
    applicable_for?: StringNullableListFilter<"Promotions">
    conditions?: JsonNullableWithAggregatesFilter<"Promotions">
    active?: BoolWithAggregatesFilter<"Promotions"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Promotions"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Promotions"> | Date | string
  }

  export type LoyaltyAccountsWhereInput = {
    AND?: LoyaltyAccountsWhereInput | LoyaltyAccountsWhereInput[]
    OR?: LoyaltyAccountsWhereInput[]
    NOT?: LoyaltyAccountsWhereInput | LoyaltyAccountsWhereInput[]
    id?: UuidFilter<"LoyaltyAccounts"> | string
    user_id?: StringFilter<"LoyaltyAccounts"> | string
    current_points?: IntFilter<"LoyaltyAccounts"> | number
    tier?: EnumLoyaltyTierFilter<"LoyaltyAccounts"> | $Enums.LoyaltyTier
    total_spent?: DecimalFilter<"LoyaltyAccounts"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"LoyaltyAccounts"> | Date | string
    updated_at?: DateTimeFilter<"LoyaltyAccounts"> | Date | string
    transactions?: LoyaltyTransactionsListRelationFilter
  }

  export type LoyaltyAccountsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    current_points?: SortOrder
    tier?: SortOrder
    total_spent?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    transactions?: LoyaltyTransactionsOrderByRelationAggregateInput
  }

  export type LoyaltyAccountsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: LoyaltyAccountsWhereInput | LoyaltyAccountsWhereInput[]
    OR?: LoyaltyAccountsWhereInput[]
    NOT?: LoyaltyAccountsWhereInput | LoyaltyAccountsWhereInput[]
    current_points?: IntFilter<"LoyaltyAccounts"> | number
    tier?: EnumLoyaltyTierFilter<"LoyaltyAccounts"> | $Enums.LoyaltyTier
    total_spent?: DecimalFilter<"LoyaltyAccounts"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"LoyaltyAccounts"> | Date | string
    updated_at?: DateTimeFilter<"LoyaltyAccounts"> | Date | string
    transactions?: LoyaltyTransactionsListRelationFilter
  }, "id" | "user_id">

  export type LoyaltyAccountsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    current_points?: SortOrder
    tier?: SortOrder
    total_spent?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LoyaltyAccountsCountOrderByAggregateInput
    _avg?: LoyaltyAccountsAvgOrderByAggregateInput
    _max?: LoyaltyAccountsMaxOrderByAggregateInput
    _min?: LoyaltyAccountsMinOrderByAggregateInput
    _sum?: LoyaltyAccountsSumOrderByAggregateInput
  }

  export type LoyaltyAccountsScalarWhereWithAggregatesInput = {
    AND?: LoyaltyAccountsScalarWhereWithAggregatesInput | LoyaltyAccountsScalarWhereWithAggregatesInput[]
    OR?: LoyaltyAccountsScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyAccountsScalarWhereWithAggregatesInput | LoyaltyAccountsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"LoyaltyAccounts"> | string
    user_id?: StringWithAggregatesFilter<"LoyaltyAccounts"> | string
    current_points?: IntWithAggregatesFilter<"LoyaltyAccounts"> | number
    tier?: EnumLoyaltyTierWithAggregatesFilter<"LoyaltyAccounts"> | $Enums.LoyaltyTier
    total_spent?: DecimalWithAggregatesFilter<"LoyaltyAccounts"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"LoyaltyAccounts"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LoyaltyAccounts"> | Date | string
  }

  export type LoyaltyTransactionsWhereInput = {
    AND?: LoyaltyTransactionsWhereInput | LoyaltyTransactionsWhereInput[]
    OR?: LoyaltyTransactionsWhereInput[]
    NOT?: LoyaltyTransactionsWhereInput | LoyaltyTransactionsWhereInput[]
    id?: UuidFilter<"LoyaltyTransactions"> | string
    loyalty_account_id?: UuidFilter<"LoyaltyTransactions"> | string
    points?: IntFilter<"LoyaltyTransactions"> | number
    type?: EnumLoyaltyTransactionTypeFilter<"LoyaltyTransactions"> | $Enums.LoyaltyTransactionType
    transaction_id?: UuidNullableFilter<"LoyaltyTransactions"> | string | null
    description?: StringNullableFilter<"LoyaltyTransactions"> | string | null
    expires_at?: DateTimeNullableFilter<"LoyaltyTransactions"> | Date | string | null
    created_at?: DateTimeFilter<"LoyaltyTransactions"> | Date | string
    loyalty_account?: XOR<LoyaltyAccountsScalarRelationFilter, LoyaltyAccountsWhereInput>
  }

  export type LoyaltyTransactionsOrderByWithRelationInput = {
    id?: SortOrder
    loyalty_account_id?: SortOrder
    points?: SortOrder
    type?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    loyalty_account?: LoyaltyAccountsOrderByWithRelationInput
  }

  export type LoyaltyTransactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoyaltyTransactionsWhereInput | LoyaltyTransactionsWhereInput[]
    OR?: LoyaltyTransactionsWhereInput[]
    NOT?: LoyaltyTransactionsWhereInput | LoyaltyTransactionsWhereInput[]
    loyalty_account_id?: UuidFilter<"LoyaltyTransactions"> | string
    points?: IntFilter<"LoyaltyTransactions"> | number
    type?: EnumLoyaltyTransactionTypeFilter<"LoyaltyTransactions"> | $Enums.LoyaltyTransactionType
    transaction_id?: UuidNullableFilter<"LoyaltyTransactions"> | string | null
    description?: StringNullableFilter<"LoyaltyTransactions"> | string | null
    expires_at?: DateTimeNullableFilter<"LoyaltyTransactions"> | Date | string | null
    created_at?: DateTimeFilter<"LoyaltyTransactions"> | Date | string
    loyalty_account?: XOR<LoyaltyAccountsScalarRelationFilter, LoyaltyAccountsWhereInput>
  }, "id">

  export type LoyaltyTransactionsOrderByWithAggregationInput = {
    id?: SortOrder
    loyalty_account_id?: SortOrder
    points?: SortOrder
    type?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: LoyaltyTransactionsCountOrderByAggregateInput
    _avg?: LoyaltyTransactionsAvgOrderByAggregateInput
    _max?: LoyaltyTransactionsMaxOrderByAggregateInput
    _min?: LoyaltyTransactionsMinOrderByAggregateInput
    _sum?: LoyaltyTransactionsSumOrderByAggregateInput
  }

  export type LoyaltyTransactionsScalarWhereWithAggregatesInput = {
    AND?: LoyaltyTransactionsScalarWhereWithAggregatesInput | LoyaltyTransactionsScalarWhereWithAggregatesInput[]
    OR?: LoyaltyTransactionsScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyTransactionsScalarWhereWithAggregatesInput | LoyaltyTransactionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"LoyaltyTransactions"> | string
    loyalty_account_id?: UuidWithAggregatesFilter<"LoyaltyTransactions"> | string
    points?: IntWithAggregatesFilter<"LoyaltyTransactions"> | number
    type?: EnumLoyaltyTransactionTypeWithAggregatesFilter<"LoyaltyTransactions"> | $Enums.LoyaltyTransactionType
    transaction_id?: UuidNullableWithAggregatesFilter<"LoyaltyTransactions"> | string | null
    description?: StringNullableWithAggregatesFilter<"LoyaltyTransactions"> | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"LoyaltyTransactions"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"LoyaltyTransactions"> | Date | string
  }

  export type BookingsCreateInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsCreateNestedManyWithoutBookingInput
    payments?: PaymentsCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsCreateNestedManyWithoutBookingInput
  }

  export type BookingsUncheckedCreateInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUpdateManyWithoutBookingNestedInput
    payments?: PaymentsUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUpdateManyWithoutBookingNestedInput
  }

  export type BookingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingsCreateManyInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsCreateInput = {
    id?: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
    booking: BookingsCreateNestedOneWithoutTicketsInput
  }

  export type TicketsUncheckedCreateInput = {
    id?: string
    booking_id: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type TicketsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingsUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsCreateManyInput = {
    id?: string
    booking_id: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type TicketsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    booking: BookingsCreateNestedOneWithoutPaymentsInput
    refunds?: RefundsCreateNestedManyWithoutPaymentInput
  }

  export type PaymentsUncheckedCreateInput = {
    id?: string
    booking_id: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    refunds?: RefundsUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingsUpdateOneRequiredWithoutPaymentsNestedInput
    refunds?: RefundsUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refunds?: RefundsUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentsCreateManyInput = {
    id?: string
    booking_id: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PaymentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
    payment: PaymentsCreateNestedOneWithoutRefundsInput
  }

  export type RefundsUncheckedCreateInput = {
    id?: string
    payment_id: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
  }

  export type RefundsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentsUpdateOneRequiredWithoutRefundsNestedInput
  }

  export type RefundsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payment_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsCreateManyInput = {
    id?: string
    payment_id: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
  }

  export type RefundsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payment_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionsCreateInput = {
    id?: string
    name: string
    name_en?: string | null
    description?: string | null
    category: $Enums.ConcessionCategory
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    available?: boolean
    inventory?: number | null
    cinema_id?: string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsCreateallergensInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    booking_concessions?: BookingConcessionsCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionsUncheckedCreateInput = {
    id?: string
    name: string
    name_en?: string | null
    description?: string | null
    category: $Enums.ConcessionCategory
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    available?: boolean
    inventory?: number | null
    cinema_id?: string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsCreateallergensInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    booking_concessions?: BookingConcessionsUncheckedCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_concessions?: BookingConcessionsUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_concessions?: BookingConcessionsUncheckedUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionsCreateManyInput = {
    id?: string
    name: string
    name_en?: string | null
    description?: string | null
    category: $Enums.ConcessionCategory
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    available?: boolean
    inventory?: number | null
    cinema_id?: string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsCreateallergensInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConcessionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsCreateInput = {
    id?: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    booking: BookingsCreateNestedOneWithoutBooking_concessionsInput
    concession: ConcessionsCreateNestedOneWithoutBooking_concessionsInput
  }

  export type BookingConcessionsUncheckedCreateInput = {
    id?: string
    booking_id: string
    concession_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type BookingConcessionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingsUpdateOneRequiredWithoutBooking_concessionsNestedInput
    concession?: ConcessionsUpdateOneRequiredWithoutBooking_concessionsNestedInput
  }

  export type BookingConcessionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    concession_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsCreateManyInput = {
    id?: string
    booking_id: string
    concession_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type BookingConcessionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    concession_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionsCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    type: $Enums.PromotionType
    value: Decimal | DecimalJsLike | number | string
    min_purchase?: Decimal | DecimalJsLike | number | string | null
    max_discount?: Decimal | DecimalJsLike | number | string | null
    valid_from: Date | string
    valid_to: Date | string
    usage_limit?: number | null
    usage_per_user?: number | null
    current_usage?: number
    applicable_for?: PromotionsCreateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PromotionsUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    type: $Enums.PromotionType
    value: Decimal | DecimalJsLike | number | string
    min_purchase?: Decimal | DecimalJsLike | number | string | null
    max_discount?: Decimal | DecimalJsLike | number | string | null
    valid_from: Date | string
    valid_to: Date | string
    usage_limit?: number | null
    usage_per_user?: number | null
    current_usage?: number
    applicable_for?: PromotionsCreateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PromotionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    min_purchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    max_discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_to?: DateTimeFieldUpdateOperationsInput | Date | string
    usage_limit?: NullableIntFieldUpdateOperationsInput | number | null
    usage_per_user?: NullableIntFieldUpdateOperationsInput | number | null
    current_usage?: IntFieldUpdateOperationsInput | number
    applicable_for?: PromotionsUpdateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    min_purchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    max_discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_to?: DateTimeFieldUpdateOperationsInput | Date | string
    usage_limit?: NullableIntFieldUpdateOperationsInput | number | null
    usage_per_user?: NullableIntFieldUpdateOperationsInput | number | null
    current_usage?: IntFieldUpdateOperationsInput | number
    applicable_for?: PromotionsUpdateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionsCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    type: $Enums.PromotionType
    value: Decimal | DecimalJsLike | number | string
    min_purchase?: Decimal | DecimalJsLike | number | string | null
    max_discount?: Decimal | DecimalJsLike | number | string | null
    valid_from: Date | string
    valid_to: Date | string
    usage_limit?: number | null
    usage_per_user?: number | null
    current_usage?: number
    applicable_for?: PromotionsCreateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PromotionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    min_purchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    max_discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_to?: DateTimeFieldUpdateOperationsInput | Date | string
    usage_limit?: NullableIntFieldUpdateOperationsInput | number | null
    usage_per_user?: NullableIntFieldUpdateOperationsInput | number | null
    current_usage?: IntFieldUpdateOperationsInput | number
    applicable_for?: PromotionsUpdateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    min_purchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    max_discount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    valid_from?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_to?: DateTimeFieldUpdateOperationsInput | Date | string
    usage_limit?: NullableIntFieldUpdateOperationsInput | number | null
    usage_per_user?: NullableIntFieldUpdateOperationsInput | number | null
    current_usage?: IntFieldUpdateOperationsInput | number
    applicable_for?: PromotionsUpdateapplicable_forInput | string[]
    conditions?: NullableJsonNullValueInput | InputJsonValue
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyAccountsCreateInput = {
    id?: string
    user_id: string
    current_points?: number
    tier?: $Enums.LoyaltyTier
    total_spent?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    transactions?: LoyaltyTransactionsCreateNestedManyWithoutLoyalty_accountInput
  }

  export type LoyaltyAccountsUncheckedCreateInput = {
    id?: string
    user_id: string
    current_points?: number
    tier?: $Enums.LoyaltyTier
    total_spent?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    transactions?: LoyaltyTransactionsUncheckedCreateNestedManyWithoutLoyalty_accountInput
  }

  export type LoyaltyAccountsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: LoyaltyTransactionsUpdateManyWithoutLoyalty_accountNestedInput
  }

  export type LoyaltyAccountsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: LoyaltyTransactionsUncheckedUpdateManyWithoutLoyalty_accountNestedInput
  }

  export type LoyaltyAccountsCreateManyInput = {
    id?: string
    user_id: string
    current_points?: number
    tier?: $Enums.LoyaltyTier
    total_spent?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LoyaltyAccountsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyAccountsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsCreateInput = {
    id?: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    loyalty_account: LoyaltyAccountsCreateNestedOneWithoutTransactionsInput
  }

  export type LoyaltyTransactionsUncheckedCreateInput = {
    id?: string
    loyalty_account_id: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type LoyaltyTransactionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    loyalty_account?: LoyaltyAccountsUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type LoyaltyTransactionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loyalty_account_id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsCreateManyInput = {
    id?: string
    loyalty_account_id: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type LoyaltyTransactionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loyalty_account_id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TicketsListRelationFilter = {
    every?: TicketsWhereInput
    some?: TicketsWhereInput
    none?: TicketsWhereInput
  }

  export type PaymentsListRelationFilter = {
    every?: PaymentsWhereInput
    some?: PaymentsWhereInput
    none?: PaymentsWhereInput
  }

  export type BookingConcessionsListRelationFilter = {
    every?: BookingConcessionsWhereInput
    some?: BookingConcessionsWhereInput
    none?: BookingConcessionsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TicketsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingConcessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_code?: SortOrder
    user_id?: SortOrder
    showtime_id?: SortOrder
    customer_name?: SortOrder
    customer_email?: SortOrder
    customer_phone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
    promotion_code?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    expires_at?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingsAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
  }

  export type BookingsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_code?: SortOrder
    user_id?: SortOrder
    showtime_id?: SortOrder
    customer_name?: SortOrder
    customer_email?: SortOrder
    customer_phone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
    promotion_code?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    expires_at?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_code?: SortOrder
    user_id?: SortOrder
    showtime_id?: SortOrder
    customer_name?: SortOrder
    customer_email?: SortOrder
    customer_phone?: SortOrder
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
    promotion_code?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    expires_at?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingsSumOrderByAggregateInput = {
    subtotal?: SortOrder
    discount?: SortOrder
    points_used?: SortOrder
    points_discount?: SortOrder
    final_amount?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type BookingsScalarRelationFilter = {
    is?: BookingsWhereInput
    isNot?: BookingsWhereInput
  }

  export type TicketsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    ticket_code?: SortOrder
    qr_code?: SortOrder
    barcode?: SortOrder
    ticket_type?: SortOrder
    price?: SortOrder
    status?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type TicketsAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type TicketsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    ticket_code?: SortOrder
    qr_code?: SortOrder
    barcode?: SortOrder
    ticket_type?: SortOrder
    price?: SortOrder
    status?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type TicketsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    ticket_code?: SortOrder
    qr_code?: SortOrder
    barcode?: SortOrder
    ticket_type?: SortOrder
    price?: SortOrder
    status?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type TicketsSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RefundsListRelationFilter = {
    every?: RefundsWhereInput
    some?: RefundsWhereInput
    none?: RefundsWhereInput
  }

  export type RefundsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    transaction_id?: SortOrder
    provider_transaction_id?: SortOrder
    payment_url?: SortOrder
    paid_at?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PaymentsAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    transaction_id?: SortOrder
    provider_transaction_id?: SortOrder
    payment_url?: SortOrder
    paid_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PaymentsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    transaction_id?: SortOrder
    provider_transaction_id?: SortOrder
    payment_url?: SortOrder
    paid_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PaymentsSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumRefundStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusFilter<$PrismaModel> | $Enums.RefundStatus
  }

  export type PaymentsScalarRelationFilter = {
    is?: PaymentsWhereInput
    isNot?: PaymentsWhereInput
  }

  export type RefundsCountOrderByAggregateInput = {
    id?: SortOrder
    payment_id?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    refunded_at?: SortOrder
    created_at?: SortOrder
  }

  export type RefundsAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type RefundsMaxOrderByAggregateInput = {
    id?: SortOrder
    payment_id?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    refunded_at?: SortOrder
    created_at?: SortOrder
  }

  export type RefundsMinOrderByAggregateInput = {
    id?: SortOrder
    payment_id?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    refunded_at?: SortOrder
    created_at?: SortOrder
  }

  export type RefundsSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumRefundStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel> | $Enums.RefundStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundStatusFilter<$PrismaModel>
    _max?: NestedEnumRefundStatusFilter<$PrismaModel>
  }

  export type EnumConcessionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ConcessionCategory | EnumConcessionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConcessionCategoryFilter<$PrismaModel> | $Enums.ConcessionCategory
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ConcessionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    name_en?: SortOrder
    description?: SortOrder
    category?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    available?: SortOrder
    inventory?: SortOrder
    cinema_id?: SortOrder
    nutrition_info?: SortOrder
    allergens?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConcessionsAvgOrderByAggregateInput = {
    price?: SortOrder
    inventory?: SortOrder
  }

  export type ConcessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    name_en?: SortOrder
    description?: SortOrder
    category?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    available?: SortOrder
    inventory?: SortOrder
    cinema_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConcessionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    name_en?: SortOrder
    description?: SortOrder
    category?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    available?: SortOrder
    inventory?: SortOrder
    cinema_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConcessionsSumOrderByAggregateInput = {
    price?: SortOrder
    inventory?: SortOrder
  }

  export type EnumConcessionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConcessionCategory | EnumConcessionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConcessionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ConcessionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConcessionCategoryFilter<$PrismaModel>
    _max?: NestedEnumConcessionCategoryFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ConcessionsScalarRelationFilter = {
    is?: ConcessionsWhereInput
    isNot?: ConcessionsWhereInput
  }

  export type BookingConcessionsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    concession_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
    created_at?: SortOrder
  }

  export type BookingConcessionsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
  }

  export type BookingConcessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    concession_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
    created_at?: SortOrder
  }

  export type BookingConcessionsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    concession_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
    created_at?: SortOrder
  }

  export type BookingConcessionsSumOrderByAggregateInput = {
    quantity?: SortOrder
    unit_price?: SortOrder
    total_price?: SortOrder
  }

  export type EnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | EnumPromotionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type PromotionsCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    value?: SortOrder
    min_purchase?: SortOrder
    max_discount?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    usage_limit?: SortOrder
    usage_per_user?: SortOrder
    current_usage?: SortOrder
    applicable_for?: SortOrder
    conditions?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PromotionsAvgOrderByAggregateInput = {
    value?: SortOrder
    min_purchase?: SortOrder
    max_discount?: SortOrder
    usage_limit?: SortOrder
    usage_per_user?: SortOrder
    current_usage?: SortOrder
  }

  export type PromotionsMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    value?: SortOrder
    min_purchase?: SortOrder
    max_discount?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    usage_limit?: SortOrder
    usage_per_user?: SortOrder
    current_usage?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PromotionsMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    value?: SortOrder
    min_purchase?: SortOrder
    max_discount?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    usage_limit?: SortOrder
    usage_per_user?: SortOrder
    current_usage?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PromotionsSumOrderByAggregateInput = {
    value?: SortOrder
    min_purchase?: SortOrder
    max_discount?: SortOrder
    usage_limit?: SortOrder
    usage_per_user?: SortOrder
    current_usage?: SortOrder
  }

  export type EnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | EnumPromotionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromotionTypeFilter<$PrismaModel>
    _max?: NestedEnumPromotionTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumLoyaltyTierFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTier | EnumLoyaltyTierFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTierFilter<$PrismaModel> | $Enums.LoyaltyTier
  }

  export type LoyaltyTransactionsListRelationFilter = {
    every?: LoyaltyTransactionsWhereInput
    some?: LoyaltyTransactionsWhereInput
    none?: LoyaltyTransactionsWhereInput
  }

  export type LoyaltyTransactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoyaltyAccountsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    current_points?: SortOrder
    tier?: SortOrder
    total_spent?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LoyaltyAccountsAvgOrderByAggregateInput = {
    current_points?: SortOrder
    total_spent?: SortOrder
  }

  export type LoyaltyAccountsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    current_points?: SortOrder
    tier?: SortOrder
    total_spent?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LoyaltyAccountsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    current_points?: SortOrder
    tier?: SortOrder
    total_spent?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LoyaltyAccountsSumOrderByAggregateInput = {
    current_points?: SortOrder
    total_spent?: SortOrder
  }

  export type EnumLoyaltyTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTier | EnumLoyaltyTierFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTierWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyTierFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyTierFilter<$PrismaModel>
  }

  export type EnumLoyaltyTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTransactionType | EnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel> | $Enums.LoyaltyTransactionType
  }

  export type LoyaltyAccountsScalarRelationFilter = {
    is?: LoyaltyAccountsWhereInput
    isNot?: LoyaltyAccountsWhereInput
  }

  export type LoyaltyTransactionsCountOrderByAggregateInput = {
    id?: SortOrder
    loyalty_account_id?: SortOrder
    points?: SortOrder
    type?: SortOrder
    transaction_id?: SortOrder
    description?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type LoyaltyTransactionsAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type LoyaltyTransactionsMaxOrderByAggregateInput = {
    id?: SortOrder
    loyalty_account_id?: SortOrder
    points?: SortOrder
    type?: SortOrder
    transaction_id?: SortOrder
    description?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type LoyaltyTransactionsMinOrderByAggregateInput = {
    id?: SortOrder
    loyalty_account_id?: SortOrder
    points?: SortOrder
    type?: SortOrder
    transaction_id?: SortOrder
    description?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type LoyaltyTransactionsSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumLoyaltyTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTransactionType | EnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel>
  }

  export type TicketsCreateNestedManyWithoutBookingInput = {
    create?: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput> | TicketsCreateWithoutBookingInput[] | TicketsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TicketsCreateOrConnectWithoutBookingInput | TicketsCreateOrConnectWithoutBookingInput[]
    createMany?: TicketsCreateManyBookingInputEnvelope
    connect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
  }

  export type PaymentsCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput> | PaymentsCreateWithoutBookingInput[] | PaymentsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutBookingInput | PaymentsCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentsCreateManyBookingInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type BookingConcessionsCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput> | BookingConcessionsCreateWithoutBookingInput[] | BookingConcessionsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutBookingInput | BookingConcessionsCreateOrConnectWithoutBookingInput[]
    createMany?: BookingConcessionsCreateManyBookingInputEnvelope
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
  }

  export type TicketsUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput> | TicketsCreateWithoutBookingInput[] | TicketsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TicketsCreateOrConnectWithoutBookingInput | TicketsCreateOrConnectWithoutBookingInput[]
    createMany?: TicketsCreateManyBookingInputEnvelope
    connect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
  }

  export type PaymentsUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput> | PaymentsCreateWithoutBookingInput[] | PaymentsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutBookingInput | PaymentsCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentsCreateManyBookingInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type BookingConcessionsUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput> | BookingConcessionsCreateWithoutBookingInput[] | BookingConcessionsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutBookingInput | BookingConcessionsCreateOrConnectWithoutBookingInput[]
    createMany?: BookingConcessionsCreateManyBookingInputEnvelope
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TicketsUpdateManyWithoutBookingNestedInput = {
    create?: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput> | TicketsCreateWithoutBookingInput[] | TicketsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TicketsCreateOrConnectWithoutBookingInput | TicketsCreateOrConnectWithoutBookingInput[]
    upsert?: TicketsUpsertWithWhereUniqueWithoutBookingInput | TicketsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: TicketsCreateManyBookingInputEnvelope
    set?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    disconnect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    delete?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    connect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    update?: TicketsUpdateWithWhereUniqueWithoutBookingInput | TicketsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: TicketsUpdateManyWithWhereWithoutBookingInput | TicketsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: TicketsScalarWhereInput | TicketsScalarWhereInput[]
  }

  export type PaymentsUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput> | PaymentsCreateWithoutBookingInput[] | PaymentsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutBookingInput | PaymentsCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutBookingInput | PaymentsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentsCreateManyBookingInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutBookingInput | PaymentsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutBookingInput | PaymentsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type BookingConcessionsUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput> | BookingConcessionsCreateWithoutBookingInput[] | BookingConcessionsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutBookingInput | BookingConcessionsCreateOrConnectWithoutBookingInput[]
    upsert?: BookingConcessionsUpsertWithWhereUniqueWithoutBookingInput | BookingConcessionsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookingConcessionsCreateManyBookingInputEnvelope
    set?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    disconnect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    delete?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    update?: BookingConcessionsUpdateWithWhereUniqueWithoutBookingInput | BookingConcessionsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookingConcessionsUpdateManyWithWhereWithoutBookingInput | BookingConcessionsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
  }

  export type TicketsUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput> | TicketsCreateWithoutBookingInput[] | TicketsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: TicketsCreateOrConnectWithoutBookingInput | TicketsCreateOrConnectWithoutBookingInput[]
    upsert?: TicketsUpsertWithWhereUniqueWithoutBookingInput | TicketsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: TicketsCreateManyBookingInputEnvelope
    set?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    disconnect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    delete?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    connect?: TicketsWhereUniqueInput | TicketsWhereUniqueInput[]
    update?: TicketsUpdateWithWhereUniqueWithoutBookingInput | TicketsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: TicketsUpdateManyWithWhereWithoutBookingInput | TicketsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: TicketsScalarWhereInput | TicketsScalarWhereInput[]
  }

  export type PaymentsUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput> | PaymentsCreateWithoutBookingInput[] | PaymentsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutBookingInput | PaymentsCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutBookingInput | PaymentsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentsCreateManyBookingInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutBookingInput | PaymentsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutBookingInput | PaymentsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type BookingConcessionsUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput> | BookingConcessionsCreateWithoutBookingInput[] | BookingConcessionsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutBookingInput | BookingConcessionsCreateOrConnectWithoutBookingInput[]
    upsert?: BookingConcessionsUpsertWithWhereUniqueWithoutBookingInput | BookingConcessionsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookingConcessionsCreateManyBookingInputEnvelope
    set?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    disconnect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    delete?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    update?: BookingConcessionsUpdateWithWhereUniqueWithoutBookingInput | BookingConcessionsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookingConcessionsUpdateManyWithWhereWithoutBookingInput | BookingConcessionsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
  }

  export type BookingsCreateNestedOneWithoutTicketsInput = {
    create?: XOR<BookingsCreateWithoutTicketsInput, BookingsUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutTicketsInput
    connect?: BookingsWhereUniqueInput
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type BookingsUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<BookingsCreateWithoutTicketsInput, BookingsUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutTicketsInput
    upsert?: BookingsUpsertWithoutTicketsInput
    connect?: BookingsWhereUniqueInput
    update?: XOR<XOR<BookingsUpdateToOneWithWhereWithoutTicketsInput, BookingsUpdateWithoutTicketsInput>, BookingsUncheckedUpdateWithoutTicketsInput>
  }

  export type BookingsCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<BookingsCreateWithoutPaymentsInput, BookingsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutPaymentsInput
    connect?: BookingsWhereUniqueInput
  }

  export type RefundsCreateNestedManyWithoutPaymentInput = {
    create?: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput> | RefundsCreateWithoutPaymentInput[] | RefundsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: RefundsCreateOrConnectWithoutPaymentInput | RefundsCreateOrConnectWithoutPaymentInput[]
    createMany?: RefundsCreateManyPaymentInputEnvelope
    connect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
  }

  export type RefundsUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput> | RefundsCreateWithoutPaymentInput[] | RefundsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: RefundsCreateOrConnectWithoutPaymentInput | RefundsCreateOrConnectWithoutPaymentInput[]
    createMany?: RefundsCreateManyPaymentInputEnvelope
    connect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type BookingsUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<BookingsCreateWithoutPaymentsInput, BookingsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutPaymentsInput
    upsert?: BookingsUpsertWithoutPaymentsInput
    connect?: BookingsWhereUniqueInput
    update?: XOR<XOR<BookingsUpdateToOneWithWhereWithoutPaymentsInput, BookingsUpdateWithoutPaymentsInput>, BookingsUncheckedUpdateWithoutPaymentsInput>
  }

  export type RefundsUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput> | RefundsCreateWithoutPaymentInput[] | RefundsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: RefundsCreateOrConnectWithoutPaymentInput | RefundsCreateOrConnectWithoutPaymentInput[]
    upsert?: RefundsUpsertWithWhereUniqueWithoutPaymentInput | RefundsUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: RefundsCreateManyPaymentInputEnvelope
    set?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    disconnect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    delete?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    connect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    update?: RefundsUpdateWithWhereUniqueWithoutPaymentInput | RefundsUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: RefundsUpdateManyWithWhereWithoutPaymentInput | RefundsUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: RefundsScalarWhereInput | RefundsScalarWhereInput[]
  }

  export type RefundsUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput> | RefundsCreateWithoutPaymentInput[] | RefundsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: RefundsCreateOrConnectWithoutPaymentInput | RefundsCreateOrConnectWithoutPaymentInput[]
    upsert?: RefundsUpsertWithWhereUniqueWithoutPaymentInput | RefundsUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: RefundsCreateManyPaymentInputEnvelope
    set?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    disconnect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    delete?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    connect?: RefundsWhereUniqueInput | RefundsWhereUniqueInput[]
    update?: RefundsUpdateWithWhereUniqueWithoutPaymentInput | RefundsUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: RefundsUpdateManyWithWhereWithoutPaymentInput | RefundsUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: RefundsScalarWhereInput | RefundsScalarWhereInput[]
  }

  export type PaymentsCreateNestedOneWithoutRefundsInput = {
    create?: XOR<PaymentsCreateWithoutRefundsInput, PaymentsUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: PaymentsCreateOrConnectWithoutRefundsInput
    connect?: PaymentsWhereUniqueInput
  }

  export type EnumRefundStatusFieldUpdateOperationsInput = {
    set?: $Enums.RefundStatus
  }

  export type PaymentsUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: XOR<PaymentsCreateWithoutRefundsInput, PaymentsUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: PaymentsCreateOrConnectWithoutRefundsInput
    upsert?: PaymentsUpsertWithoutRefundsInput
    connect?: PaymentsWhereUniqueInput
    update?: XOR<XOR<PaymentsUpdateToOneWithWhereWithoutRefundsInput, PaymentsUpdateWithoutRefundsInput>, PaymentsUncheckedUpdateWithoutRefundsInput>
  }

  export type ConcessionsCreateallergensInput = {
    set: string[]
  }

  export type BookingConcessionsCreateNestedManyWithoutConcessionInput = {
    create?: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput> | BookingConcessionsCreateWithoutConcessionInput[] | BookingConcessionsUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutConcessionInput | BookingConcessionsCreateOrConnectWithoutConcessionInput[]
    createMany?: BookingConcessionsCreateManyConcessionInputEnvelope
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
  }

  export type BookingConcessionsUncheckedCreateNestedManyWithoutConcessionInput = {
    create?: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput> | BookingConcessionsCreateWithoutConcessionInput[] | BookingConcessionsUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutConcessionInput | BookingConcessionsCreateOrConnectWithoutConcessionInput[]
    createMany?: BookingConcessionsCreateManyConcessionInputEnvelope
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
  }

  export type EnumConcessionCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ConcessionCategory
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConcessionsUpdateallergensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookingConcessionsUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput> | BookingConcessionsCreateWithoutConcessionInput[] | BookingConcessionsUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutConcessionInput | BookingConcessionsCreateOrConnectWithoutConcessionInput[]
    upsert?: BookingConcessionsUpsertWithWhereUniqueWithoutConcessionInput | BookingConcessionsUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: BookingConcessionsCreateManyConcessionInputEnvelope
    set?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    disconnect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    delete?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    update?: BookingConcessionsUpdateWithWhereUniqueWithoutConcessionInput | BookingConcessionsUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: BookingConcessionsUpdateManyWithWhereWithoutConcessionInput | BookingConcessionsUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
  }

  export type BookingConcessionsUncheckedUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput> | BookingConcessionsCreateWithoutConcessionInput[] | BookingConcessionsUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: BookingConcessionsCreateOrConnectWithoutConcessionInput | BookingConcessionsCreateOrConnectWithoutConcessionInput[]
    upsert?: BookingConcessionsUpsertWithWhereUniqueWithoutConcessionInput | BookingConcessionsUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: BookingConcessionsCreateManyConcessionInputEnvelope
    set?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    disconnect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    delete?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    connect?: BookingConcessionsWhereUniqueInput | BookingConcessionsWhereUniqueInput[]
    update?: BookingConcessionsUpdateWithWhereUniqueWithoutConcessionInput | BookingConcessionsUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: BookingConcessionsUpdateManyWithWhereWithoutConcessionInput | BookingConcessionsUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
  }

  export type BookingsCreateNestedOneWithoutBooking_concessionsInput = {
    create?: XOR<BookingsCreateWithoutBooking_concessionsInput, BookingsUncheckedCreateWithoutBooking_concessionsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutBooking_concessionsInput
    connect?: BookingsWhereUniqueInput
  }

  export type ConcessionsCreateNestedOneWithoutBooking_concessionsInput = {
    create?: XOR<ConcessionsCreateWithoutBooking_concessionsInput, ConcessionsUncheckedCreateWithoutBooking_concessionsInput>
    connectOrCreate?: ConcessionsCreateOrConnectWithoutBooking_concessionsInput
    connect?: ConcessionsWhereUniqueInput
  }

  export type BookingsUpdateOneRequiredWithoutBooking_concessionsNestedInput = {
    create?: XOR<BookingsCreateWithoutBooking_concessionsInput, BookingsUncheckedCreateWithoutBooking_concessionsInput>
    connectOrCreate?: BookingsCreateOrConnectWithoutBooking_concessionsInput
    upsert?: BookingsUpsertWithoutBooking_concessionsInput
    connect?: BookingsWhereUniqueInput
    update?: XOR<XOR<BookingsUpdateToOneWithWhereWithoutBooking_concessionsInput, BookingsUpdateWithoutBooking_concessionsInput>, BookingsUncheckedUpdateWithoutBooking_concessionsInput>
  }

  export type ConcessionsUpdateOneRequiredWithoutBooking_concessionsNestedInput = {
    create?: XOR<ConcessionsCreateWithoutBooking_concessionsInput, ConcessionsUncheckedCreateWithoutBooking_concessionsInput>
    connectOrCreate?: ConcessionsCreateOrConnectWithoutBooking_concessionsInput
    upsert?: ConcessionsUpsertWithoutBooking_concessionsInput
    connect?: ConcessionsWhereUniqueInput
    update?: XOR<XOR<ConcessionsUpdateToOneWithWhereWithoutBooking_concessionsInput, ConcessionsUpdateWithoutBooking_concessionsInput>, ConcessionsUncheckedUpdateWithoutBooking_concessionsInput>
  }

  export type PromotionsCreateapplicable_forInput = {
    set: string[]
  }

  export type EnumPromotionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PromotionType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type PromotionsUpdateapplicable_forInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LoyaltyTransactionsCreateNestedManyWithoutLoyalty_accountInput = {
    create?: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput> | LoyaltyTransactionsCreateWithoutLoyalty_accountInput[] | LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput[]
    connectOrCreate?: LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput | LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput[]
    createMany?: LoyaltyTransactionsCreateManyLoyalty_accountInputEnvelope
    connect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
  }

  export type LoyaltyTransactionsUncheckedCreateNestedManyWithoutLoyalty_accountInput = {
    create?: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput> | LoyaltyTransactionsCreateWithoutLoyalty_accountInput[] | LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput[]
    connectOrCreate?: LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput | LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput[]
    createMany?: LoyaltyTransactionsCreateManyLoyalty_accountInputEnvelope
    connect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
  }

  export type EnumLoyaltyTierFieldUpdateOperationsInput = {
    set?: $Enums.LoyaltyTier
  }

  export type LoyaltyTransactionsUpdateManyWithoutLoyalty_accountNestedInput = {
    create?: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput> | LoyaltyTransactionsCreateWithoutLoyalty_accountInput[] | LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput[]
    connectOrCreate?: LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput | LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput[]
    upsert?: LoyaltyTransactionsUpsertWithWhereUniqueWithoutLoyalty_accountInput | LoyaltyTransactionsUpsertWithWhereUniqueWithoutLoyalty_accountInput[]
    createMany?: LoyaltyTransactionsCreateManyLoyalty_accountInputEnvelope
    set?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    disconnect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    delete?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    connect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    update?: LoyaltyTransactionsUpdateWithWhereUniqueWithoutLoyalty_accountInput | LoyaltyTransactionsUpdateWithWhereUniqueWithoutLoyalty_accountInput[]
    updateMany?: LoyaltyTransactionsUpdateManyWithWhereWithoutLoyalty_accountInput | LoyaltyTransactionsUpdateManyWithWhereWithoutLoyalty_accountInput[]
    deleteMany?: LoyaltyTransactionsScalarWhereInput | LoyaltyTransactionsScalarWhereInput[]
  }

  export type LoyaltyTransactionsUncheckedUpdateManyWithoutLoyalty_accountNestedInput = {
    create?: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput> | LoyaltyTransactionsCreateWithoutLoyalty_accountInput[] | LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput[]
    connectOrCreate?: LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput | LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput[]
    upsert?: LoyaltyTransactionsUpsertWithWhereUniqueWithoutLoyalty_accountInput | LoyaltyTransactionsUpsertWithWhereUniqueWithoutLoyalty_accountInput[]
    createMany?: LoyaltyTransactionsCreateManyLoyalty_accountInputEnvelope
    set?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    disconnect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    delete?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    connect?: LoyaltyTransactionsWhereUniqueInput | LoyaltyTransactionsWhereUniqueInput[]
    update?: LoyaltyTransactionsUpdateWithWhereUniqueWithoutLoyalty_accountInput | LoyaltyTransactionsUpdateWithWhereUniqueWithoutLoyalty_accountInput[]
    updateMany?: LoyaltyTransactionsUpdateManyWithWhereWithoutLoyalty_accountInput | LoyaltyTransactionsUpdateManyWithWhereWithoutLoyalty_accountInput[]
    deleteMany?: LoyaltyTransactionsScalarWhereInput | LoyaltyTransactionsScalarWhereInput[]
  }

  export type LoyaltyAccountsCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<LoyaltyAccountsCreateWithoutTransactionsInput, LoyaltyAccountsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoyaltyAccountsCreateOrConnectWithoutTransactionsInput
    connect?: LoyaltyAccountsWhereUniqueInput
  }

  export type EnumLoyaltyTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.LoyaltyTransactionType
  }

  export type LoyaltyAccountsUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<LoyaltyAccountsCreateWithoutTransactionsInput, LoyaltyAccountsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoyaltyAccountsCreateOrConnectWithoutTransactionsInput
    upsert?: LoyaltyAccountsUpsertWithoutTransactionsInput
    connect?: LoyaltyAccountsWhereUniqueInput
    update?: XOR<XOR<LoyaltyAccountsUpdateToOneWithWhereWithoutTransactionsInput, LoyaltyAccountsUpdateWithoutTransactionsInput>, LoyaltyAccountsUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumRefundStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusFilter<$PrismaModel> | $Enums.RefundStatus
  }

  export type NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel> | $Enums.RefundStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundStatusFilter<$PrismaModel>
    _max?: NestedEnumRefundStatusFilter<$PrismaModel>
  }

  export type NestedEnumConcessionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ConcessionCategory | EnumConcessionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConcessionCategoryFilter<$PrismaModel> | $Enums.ConcessionCategory
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumConcessionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConcessionCategory | EnumConcessionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConcessionCategory[] | ListEnumConcessionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConcessionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ConcessionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConcessionCategoryFilter<$PrismaModel>
    _max?: NestedEnumConcessionCategoryFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | EnumPromotionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | EnumPromotionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionType[] | ListEnumPromotionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromotionTypeFilter<$PrismaModel>
    _max?: NestedEnumPromotionTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumLoyaltyTierFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTier | EnumLoyaltyTierFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTierFilter<$PrismaModel> | $Enums.LoyaltyTier
  }

  export type NestedEnumLoyaltyTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTier | EnumLoyaltyTierFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTier[] | ListEnumLoyaltyTierFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTierWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyTierFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyTierFilter<$PrismaModel>
  }

  export type NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTransactionType | EnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel> | $Enums.LoyaltyTransactionType
  }

  export type NestedEnumLoyaltyTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyTransactionType | EnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyTransactionType[] | ListEnumLoyaltyTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyTransactionTypeFilter<$PrismaModel>
  }

  export type TicketsCreateWithoutBookingInput = {
    id?: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type TicketsUncheckedCreateWithoutBookingInput = {
    id?: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type TicketsCreateOrConnectWithoutBookingInput = {
    where: TicketsWhereUniqueInput
    create: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput>
  }

  export type TicketsCreateManyBookingInputEnvelope = {
    data: TicketsCreateManyBookingInput | TicketsCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type PaymentsCreateWithoutBookingInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    refunds?: RefundsCreateNestedManyWithoutPaymentInput
  }

  export type PaymentsUncheckedCreateWithoutBookingInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    refunds?: RefundsUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentsCreateOrConnectWithoutBookingInput = {
    where: PaymentsWhereUniqueInput
    create: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput>
  }

  export type PaymentsCreateManyBookingInputEnvelope = {
    data: PaymentsCreateManyBookingInput | PaymentsCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type BookingConcessionsCreateWithoutBookingInput = {
    id?: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    concession: ConcessionsCreateNestedOneWithoutBooking_concessionsInput
  }

  export type BookingConcessionsUncheckedCreateWithoutBookingInput = {
    id?: string
    concession_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type BookingConcessionsCreateOrConnectWithoutBookingInput = {
    where: BookingConcessionsWhereUniqueInput
    create: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput>
  }

  export type BookingConcessionsCreateManyBookingInputEnvelope = {
    data: BookingConcessionsCreateManyBookingInput | BookingConcessionsCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type TicketsUpsertWithWhereUniqueWithoutBookingInput = {
    where: TicketsWhereUniqueInput
    update: XOR<TicketsUpdateWithoutBookingInput, TicketsUncheckedUpdateWithoutBookingInput>
    create: XOR<TicketsCreateWithoutBookingInput, TicketsUncheckedCreateWithoutBookingInput>
  }

  export type TicketsUpdateWithWhereUniqueWithoutBookingInput = {
    where: TicketsWhereUniqueInput
    data: XOR<TicketsUpdateWithoutBookingInput, TicketsUncheckedUpdateWithoutBookingInput>
  }

  export type TicketsUpdateManyWithWhereWithoutBookingInput = {
    where: TicketsScalarWhereInput
    data: XOR<TicketsUpdateManyMutationInput, TicketsUncheckedUpdateManyWithoutBookingInput>
  }

  export type TicketsScalarWhereInput = {
    AND?: TicketsScalarWhereInput | TicketsScalarWhereInput[]
    OR?: TicketsScalarWhereInput[]
    NOT?: TicketsScalarWhereInput | TicketsScalarWhereInput[]
    id?: UuidFilter<"Tickets"> | string
    booking_id?: UuidFilter<"Tickets"> | string
    seat_id?: UuidFilter<"Tickets"> | string
    ticket_code?: StringFilter<"Tickets"> | string
    qr_code?: StringNullableFilter<"Tickets"> | string | null
    barcode?: StringNullableFilter<"Tickets"> | string | null
    ticket_type?: StringFilter<"Tickets"> | string
    price?: DecimalFilter<"Tickets"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Tickets"> | $Enums.TicketStatus
    used_at?: DateTimeNullableFilter<"Tickets"> | Date | string | null
    created_at?: DateTimeFilter<"Tickets"> | Date | string
  }

  export type PaymentsUpsertWithWhereUniqueWithoutBookingInput = {
    where: PaymentsWhereUniqueInput
    update: XOR<PaymentsUpdateWithoutBookingInput, PaymentsUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentsCreateWithoutBookingInput, PaymentsUncheckedCreateWithoutBookingInput>
  }

  export type PaymentsUpdateWithWhereUniqueWithoutBookingInput = {
    where: PaymentsWhereUniqueInput
    data: XOR<PaymentsUpdateWithoutBookingInput, PaymentsUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentsUpdateManyWithWhereWithoutBookingInput = {
    where: PaymentsScalarWhereInput
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyWithoutBookingInput>
  }

  export type PaymentsScalarWhereInput = {
    AND?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
    OR?: PaymentsScalarWhereInput[]
    NOT?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
    id?: UuidFilter<"Payments"> | string
    booking_id?: UuidFilter<"Payments"> | string
    amount?: DecimalFilter<"Payments"> | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFilter<"Payments"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payments"> | $Enums.PaymentStatus
    transaction_id?: StringNullableFilter<"Payments"> | string | null
    provider_transaction_id?: StringNullableFilter<"Payments"> | string | null
    payment_url?: StringNullableFilter<"Payments"> | string | null
    paid_at?: DateTimeNullableFilter<"Payments"> | Date | string | null
    metadata?: JsonNullableFilter<"Payments">
    created_at?: DateTimeFilter<"Payments"> | Date | string
    updated_at?: DateTimeFilter<"Payments"> | Date | string
  }

  export type BookingConcessionsUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookingConcessionsWhereUniqueInput
    update: XOR<BookingConcessionsUpdateWithoutBookingInput, BookingConcessionsUncheckedUpdateWithoutBookingInput>
    create: XOR<BookingConcessionsCreateWithoutBookingInput, BookingConcessionsUncheckedCreateWithoutBookingInput>
  }

  export type BookingConcessionsUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookingConcessionsWhereUniqueInput
    data: XOR<BookingConcessionsUpdateWithoutBookingInput, BookingConcessionsUncheckedUpdateWithoutBookingInput>
  }

  export type BookingConcessionsUpdateManyWithWhereWithoutBookingInput = {
    where: BookingConcessionsScalarWhereInput
    data: XOR<BookingConcessionsUpdateManyMutationInput, BookingConcessionsUncheckedUpdateManyWithoutBookingInput>
  }

  export type BookingConcessionsScalarWhereInput = {
    AND?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
    OR?: BookingConcessionsScalarWhereInput[]
    NOT?: BookingConcessionsScalarWhereInput | BookingConcessionsScalarWhereInput[]
    id?: UuidFilter<"BookingConcessions"> | string
    booking_id?: UuidFilter<"BookingConcessions"> | string
    concession_id?: UuidFilter<"BookingConcessions"> | string
    quantity?: IntFilter<"BookingConcessions"> | number
    unit_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFilter<"BookingConcessions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"BookingConcessions"> | Date | string
  }

  export type BookingsCreateWithoutTicketsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    payments?: PaymentsCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsCreateNestedManyWithoutBookingInput
  }

  export type BookingsUncheckedCreateWithoutTicketsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    payments?: PaymentsUncheckedCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingsCreateOrConnectWithoutTicketsInput = {
    where: BookingsWhereUniqueInput
    create: XOR<BookingsCreateWithoutTicketsInput, BookingsUncheckedCreateWithoutTicketsInput>
  }

  export type BookingsUpsertWithoutTicketsInput = {
    update: XOR<BookingsUpdateWithoutTicketsInput, BookingsUncheckedUpdateWithoutTicketsInput>
    create: XOR<BookingsCreateWithoutTicketsInput, BookingsUncheckedCreateWithoutTicketsInput>
    where?: BookingsWhereInput
  }

  export type BookingsUpdateToOneWithWhereWithoutTicketsInput = {
    where?: BookingsWhereInput
    data: XOR<BookingsUpdateWithoutTicketsInput, BookingsUncheckedUpdateWithoutTicketsInput>
  }

  export type BookingsUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentsUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUpdateManyWithoutBookingNestedInput
  }

  export type BookingsUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentsUncheckedUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingsCreateWithoutPaymentsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsCreateNestedManyWithoutBookingInput
  }

  export type BookingsUncheckedCreateWithoutPaymentsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsUncheckedCreateNestedManyWithoutBookingInput
    booking_concessions?: BookingConcessionsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingsCreateOrConnectWithoutPaymentsInput = {
    where: BookingsWhereUniqueInput
    create: XOR<BookingsCreateWithoutPaymentsInput, BookingsUncheckedCreateWithoutPaymentsInput>
  }

  export type RefundsCreateWithoutPaymentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
  }

  export type RefundsUncheckedCreateWithoutPaymentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
  }

  export type RefundsCreateOrConnectWithoutPaymentInput = {
    where: RefundsWhereUniqueInput
    create: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput>
  }

  export type RefundsCreateManyPaymentInputEnvelope = {
    data: RefundsCreateManyPaymentInput | RefundsCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type BookingsUpsertWithoutPaymentsInput = {
    update: XOR<BookingsUpdateWithoutPaymentsInput, BookingsUncheckedUpdateWithoutPaymentsInput>
    create: XOR<BookingsCreateWithoutPaymentsInput, BookingsUncheckedCreateWithoutPaymentsInput>
    where?: BookingsWhereInput
  }

  export type BookingsUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: BookingsWhereInput
    data: XOR<BookingsUpdateWithoutPaymentsInput, BookingsUncheckedUpdateWithoutPaymentsInput>
  }

  export type BookingsUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUpdateManyWithoutBookingNestedInput
  }

  export type BookingsUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUncheckedUpdateManyWithoutBookingNestedInput
    booking_concessions?: BookingConcessionsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type RefundsUpsertWithWhereUniqueWithoutPaymentInput = {
    where: RefundsWhereUniqueInput
    update: XOR<RefundsUpdateWithoutPaymentInput, RefundsUncheckedUpdateWithoutPaymentInput>
    create: XOR<RefundsCreateWithoutPaymentInput, RefundsUncheckedCreateWithoutPaymentInput>
  }

  export type RefundsUpdateWithWhereUniqueWithoutPaymentInput = {
    where: RefundsWhereUniqueInput
    data: XOR<RefundsUpdateWithoutPaymentInput, RefundsUncheckedUpdateWithoutPaymentInput>
  }

  export type RefundsUpdateManyWithWhereWithoutPaymentInput = {
    where: RefundsScalarWhereInput
    data: XOR<RefundsUpdateManyMutationInput, RefundsUncheckedUpdateManyWithoutPaymentInput>
  }

  export type RefundsScalarWhereInput = {
    AND?: RefundsScalarWhereInput | RefundsScalarWhereInput[]
    OR?: RefundsScalarWhereInput[]
    NOT?: RefundsScalarWhereInput | RefundsScalarWhereInput[]
    id?: UuidFilter<"Refunds"> | string
    payment_id?: UuidFilter<"Refunds"> | string
    amount?: DecimalFilter<"Refunds"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"Refunds"> | string
    status?: EnumRefundStatusFilter<"Refunds"> | $Enums.RefundStatus
    refunded_at?: DateTimeNullableFilter<"Refunds"> | Date | string | null
    created_at?: DateTimeFilter<"Refunds"> | Date | string
  }

  export type PaymentsCreateWithoutRefundsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    booking: BookingsCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentsUncheckedCreateWithoutRefundsInput = {
    id?: string
    booking_id: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PaymentsCreateOrConnectWithoutRefundsInput = {
    where: PaymentsWhereUniqueInput
    create: XOR<PaymentsCreateWithoutRefundsInput, PaymentsUncheckedCreateWithoutRefundsInput>
  }

  export type PaymentsUpsertWithoutRefundsInput = {
    update: XOR<PaymentsUpdateWithoutRefundsInput, PaymentsUncheckedUpdateWithoutRefundsInput>
    create: XOR<PaymentsCreateWithoutRefundsInput, PaymentsUncheckedCreateWithoutRefundsInput>
    where?: PaymentsWhereInput
  }

  export type PaymentsUpdateToOneWithWhereWithoutRefundsInput = {
    where?: PaymentsWhereInput
    data: XOR<PaymentsUpdateWithoutRefundsInput, PaymentsUncheckedUpdateWithoutRefundsInput>
  }

  export type PaymentsUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingsUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentsUncheckedUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsCreateWithoutConcessionInput = {
    id?: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    booking: BookingsCreateNestedOneWithoutBooking_concessionsInput
  }

  export type BookingConcessionsUncheckedCreateWithoutConcessionInput = {
    id?: string
    booking_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type BookingConcessionsCreateOrConnectWithoutConcessionInput = {
    where: BookingConcessionsWhereUniqueInput
    create: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput>
  }

  export type BookingConcessionsCreateManyConcessionInputEnvelope = {
    data: BookingConcessionsCreateManyConcessionInput | BookingConcessionsCreateManyConcessionInput[]
    skipDuplicates?: boolean
  }

  export type BookingConcessionsUpsertWithWhereUniqueWithoutConcessionInput = {
    where: BookingConcessionsWhereUniqueInput
    update: XOR<BookingConcessionsUpdateWithoutConcessionInput, BookingConcessionsUncheckedUpdateWithoutConcessionInput>
    create: XOR<BookingConcessionsCreateWithoutConcessionInput, BookingConcessionsUncheckedCreateWithoutConcessionInput>
  }

  export type BookingConcessionsUpdateWithWhereUniqueWithoutConcessionInput = {
    where: BookingConcessionsWhereUniqueInput
    data: XOR<BookingConcessionsUpdateWithoutConcessionInput, BookingConcessionsUncheckedUpdateWithoutConcessionInput>
  }

  export type BookingConcessionsUpdateManyWithWhereWithoutConcessionInput = {
    where: BookingConcessionsScalarWhereInput
    data: XOR<BookingConcessionsUpdateManyMutationInput, BookingConcessionsUncheckedUpdateManyWithoutConcessionInput>
  }

  export type BookingsCreateWithoutBooking_concessionsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsCreateNestedManyWithoutBookingInput
    payments?: PaymentsCreateNestedManyWithoutBookingInput
  }

  export type BookingsUncheckedCreateWithoutBooking_concessionsInput = {
    id?: string
    booking_code: string
    user_id: string
    showtime_id: string
    customer_name: string
    customer_email: string
    customer_phone?: string | null
    subtotal: Decimal | DecimalJsLike | number | string
    discount?: Decimal | DecimalJsLike | number | string
    points_used?: number
    points_discount?: Decimal | DecimalJsLike | number | string
    final_amount: Decimal | DecimalJsLike | number | string
    promotion_code?: string | null
    status?: $Enums.BookingStatus
    payment_status?: $Enums.PaymentStatus
    expires_at?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tickets?: TicketsUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingsCreateOrConnectWithoutBooking_concessionsInput = {
    where: BookingsWhereUniqueInput
    create: XOR<BookingsCreateWithoutBooking_concessionsInput, BookingsUncheckedCreateWithoutBooking_concessionsInput>
  }

  export type ConcessionsCreateWithoutBooking_concessionsInput = {
    id?: string
    name: string
    name_en?: string | null
    description?: string | null
    category: $Enums.ConcessionCategory
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    available?: boolean
    inventory?: number | null
    cinema_id?: string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsCreateallergensInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConcessionsUncheckedCreateWithoutBooking_concessionsInput = {
    id?: string
    name: string
    name_en?: string | null
    description?: string | null
    category: $Enums.ConcessionCategory
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    available?: boolean
    inventory?: number | null
    cinema_id?: string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsCreateallergensInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConcessionsCreateOrConnectWithoutBooking_concessionsInput = {
    where: ConcessionsWhereUniqueInput
    create: XOR<ConcessionsCreateWithoutBooking_concessionsInput, ConcessionsUncheckedCreateWithoutBooking_concessionsInput>
  }

  export type BookingsUpsertWithoutBooking_concessionsInput = {
    update: XOR<BookingsUpdateWithoutBooking_concessionsInput, BookingsUncheckedUpdateWithoutBooking_concessionsInput>
    create: XOR<BookingsCreateWithoutBooking_concessionsInput, BookingsUncheckedCreateWithoutBooking_concessionsInput>
    where?: BookingsWhereInput
  }

  export type BookingsUpdateToOneWithWhereWithoutBooking_concessionsInput = {
    where?: BookingsWhereInput
    data: XOR<BookingsUpdateWithoutBooking_concessionsInput, BookingsUncheckedUpdateWithoutBooking_concessionsInput>
  }

  export type BookingsUpdateWithoutBooking_concessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUpdateManyWithoutBookingNestedInput
    payments?: PaymentsUpdateManyWithoutBookingNestedInput
  }

  export type BookingsUncheckedUpdateWithoutBooking_concessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    showtime_id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    customer_email?: StringFieldUpdateOperationsInput | string
    customer_phone?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    points_used?: IntFieldUpdateOperationsInput | number
    points_discount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    final_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotion_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketsUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type ConcessionsUpsertWithoutBooking_concessionsInput = {
    update: XOR<ConcessionsUpdateWithoutBooking_concessionsInput, ConcessionsUncheckedUpdateWithoutBooking_concessionsInput>
    create: XOR<ConcessionsCreateWithoutBooking_concessionsInput, ConcessionsUncheckedCreateWithoutBooking_concessionsInput>
    where?: ConcessionsWhereInput
  }

  export type ConcessionsUpdateToOneWithWhereWithoutBooking_concessionsInput = {
    where?: ConcessionsWhereInput
    data: XOR<ConcessionsUpdateWithoutBooking_concessionsInput, ConcessionsUncheckedUpdateWithoutBooking_concessionsInput>
  }

  export type ConcessionsUpdateWithoutBooking_concessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionsUncheckedUpdateWithoutBooking_concessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    name_en?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumConcessionCategoryFieldUpdateOperationsInput | $Enums.ConcessionCategory
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    inventory?: NullableIntFieldUpdateOperationsInput | number | null
    cinema_id?: NullableStringFieldUpdateOperationsInput | string | null
    nutrition_info?: NullableJsonNullValueInput | InputJsonValue
    allergens?: ConcessionsUpdateallergensInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsCreateWithoutLoyalty_accountInput = {
    id?: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput = {
    id?: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type LoyaltyTransactionsCreateOrConnectWithoutLoyalty_accountInput = {
    where: LoyaltyTransactionsWhereUniqueInput
    create: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput>
  }

  export type LoyaltyTransactionsCreateManyLoyalty_accountInputEnvelope = {
    data: LoyaltyTransactionsCreateManyLoyalty_accountInput | LoyaltyTransactionsCreateManyLoyalty_accountInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltyTransactionsUpsertWithWhereUniqueWithoutLoyalty_accountInput = {
    where: LoyaltyTransactionsWhereUniqueInput
    update: XOR<LoyaltyTransactionsUpdateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedUpdateWithoutLoyalty_accountInput>
    create: XOR<LoyaltyTransactionsCreateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedCreateWithoutLoyalty_accountInput>
  }

  export type LoyaltyTransactionsUpdateWithWhereUniqueWithoutLoyalty_accountInput = {
    where: LoyaltyTransactionsWhereUniqueInput
    data: XOR<LoyaltyTransactionsUpdateWithoutLoyalty_accountInput, LoyaltyTransactionsUncheckedUpdateWithoutLoyalty_accountInput>
  }

  export type LoyaltyTransactionsUpdateManyWithWhereWithoutLoyalty_accountInput = {
    where: LoyaltyTransactionsScalarWhereInput
    data: XOR<LoyaltyTransactionsUpdateManyMutationInput, LoyaltyTransactionsUncheckedUpdateManyWithoutLoyalty_accountInput>
  }

  export type LoyaltyTransactionsScalarWhereInput = {
    AND?: LoyaltyTransactionsScalarWhereInput | LoyaltyTransactionsScalarWhereInput[]
    OR?: LoyaltyTransactionsScalarWhereInput[]
    NOT?: LoyaltyTransactionsScalarWhereInput | LoyaltyTransactionsScalarWhereInput[]
    id?: UuidFilter<"LoyaltyTransactions"> | string
    loyalty_account_id?: UuidFilter<"LoyaltyTransactions"> | string
    points?: IntFilter<"LoyaltyTransactions"> | number
    type?: EnumLoyaltyTransactionTypeFilter<"LoyaltyTransactions"> | $Enums.LoyaltyTransactionType
    transaction_id?: UuidNullableFilter<"LoyaltyTransactions"> | string | null
    description?: StringNullableFilter<"LoyaltyTransactions"> | string | null
    expires_at?: DateTimeNullableFilter<"LoyaltyTransactions"> | Date | string | null
    created_at?: DateTimeFilter<"LoyaltyTransactions"> | Date | string
  }

  export type LoyaltyAccountsCreateWithoutTransactionsInput = {
    id?: string
    user_id: string
    current_points?: number
    tier?: $Enums.LoyaltyTier
    total_spent?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LoyaltyAccountsUncheckedCreateWithoutTransactionsInput = {
    id?: string
    user_id: string
    current_points?: number
    tier?: $Enums.LoyaltyTier
    total_spent?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LoyaltyAccountsCreateOrConnectWithoutTransactionsInput = {
    where: LoyaltyAccountsWhereUniqueInput
    create: XOR<LoyaltyAccountsCreateWithoutTransactionsInput, LoyaltyAccountsUncheckedCreateWithoutTransactionsInput>
  }

  export type LoyaltyAccountsUpsertWithoutTransactionsInput = {
    update: XOR<LoyaltyAccountsUpdateWithoutTransactionsInput, LoyaltyAccountsUncheckedUpdateWithoutTransactionsInput>
    create: XOR<LoyaltyAccountsCreateWithoutTransactionsInput, LoyaltyAccountsUncheckedCreateWithoutTransactionsInput>
    where?: LoyaltyAccountsWhereInput
  }

  export type LoyaltyAccountsUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: LoyaltyAccountsWhereInput
    data: XOR<LoyaltyAccountsUpdateWithoutTransactionsInput, LoyaltyAccountsUncheckedUpdateWithoutTransactionsInput>
  }

  export type LoyaltyAccountsUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyAccountsUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    current_points?: IntFieldUpdateOperationsInput | number
    tier?: EnumLoyaltyTierFieldUpdateOperationsInput | $Enums.LoyaltyTier
    total_spent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsCreateManyBookingInput = {
    id?: string
    seat_id: string
    ticket_code: string
    qr_code?: string | null
    barcode?: string | null
    ticket_type: string
    price: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type PaymentsCreateManyBookingInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    payment_method: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    transaction_id?: string | null
    provider_transaction_id?: string | null
    payment_url?: string | null
    paid_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingConcessionsCreateManyBookingInput = {
    id?: string
    concession_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type TicketsUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketsUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    seat_id?: StringFieldUpdateOperationsInput | string
    ticket_code?: StringFieldUpdateOperationsInput | string
    qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    ticket_type?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refunds?: RefundsUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentsUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refunds?: RefundsUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentsUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    provider_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    payment_url?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concession?: ConcessionsUpdateOneRequiredWithoutBooking_concessionsNestedInput
  }

  export type BookingConcessionsUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    concession_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    concession_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsCreateManyPaymentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.RefundStatus
    refunded_at?: Date | string | null
    created_at?: Date | string
  }

  export type RefundsUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundsUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    refunded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsCreateManyConcessionInput = {
    id?: string
    booking_id: string
    quantity: number
    unit_price: Decimal | DecimalJsLike | number | string
    total_price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
  }

  export type BookingConcessionsUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingsUpdateOneRequiredWithoutBooking_concessionsNestedInput
  }

  export type BookingConcessionsUncheckedUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingConcessionsUncheckedUpdateManyWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsCreateManyLoyalty_accountInput = {
    id?: string
    points: number
    type: $Enums.LoyaltyTransactionType
    transaction_id?: string | null
    description?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type LoyaltyTransactionsUpdateWithoutLoyalty_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsUncheckedUpdateWithoutLoyalty_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyTransactionsUncheckedUpdateManyWithoutLoyalty_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    type?: EnumLoyaltyTransactionTypeFieldUpdateOperationsInput | $Enums.LoyaltyTransactionType
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}