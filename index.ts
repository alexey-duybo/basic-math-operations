type testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type arr = any[]

type Length<T extends arr> = T['length']

type Increment<T extends arr> = [...T, any]
type Decrement<T extends arr> = T extends [...infer R, any] ? R : never

type FromNumber<T extends number, R extends arr = []> = Length<R> extends T ? R : FromNumber<T, Increment<R>> 

type Plus<T extends arr, U extends arr> = [...T, ...U]
type Minus<T extends arr, U extends arr> = Length<U> extends 0 ? T : Minus<Decrement<T>, Decrement<U>>

type IsEqual<T extends arr, U extends arr> = Length<T> extends Length<U> ? unknown : never
type IsMore<T extends arr, U extends arr> =
    Length<T> extends 0 
        ? never
        : Length<U> extends 0
            ? unknown
            : IsMore<Decrement<T>, Decrement<U>>
type IsLess<T extends arr, U extends arr> = 
    unknown extends IsEqual<T, U>
        ? never
        : unknown extends IsMore<T, U>
            ? never
            : unknown

type Multiply<T extends arr, U extends arr, R extends arr = []> =
    Length<T> extends 0 
        ? []
        : Length<U> extends 0
            ? []
            : Length<U> extends 1
                ? Length<R> extends 0
                    ? T
                    : [...R, ...T]
                : Multiply<T, Decrement<U>, [...R, ...T]>

type Devide<T extends arr, U extends arr, I extends arr = []> =
    Length<U> extends 0
        ? never
        : Length<U> extends 1
            ? T
            : Length<T> extends 0
                ? I
                : unknown extends IsLess<T, U>
                    ? never
                    : Devide<Minus<T, U>, U, Increment<I> >

type Rest<T extends arr, U extends arr> =
    Length<U> extends 0
        ? never
        : Length<U> extends 1
            ? []
            : Length<T> extends 0
                ? []
                : unknown extends IsLess<T, U>
                    ? T
                    : Rest<Minus<T, U>, U>

type Full<T extends arr, U extends arr, I extends arr = []> =
    Length<U> extends 0
        ? never
        : Length<U> extends 1
            ? T
            : Length<T> extends 0
                ? I
                : unknown extends IsLess<T, U>
                    ? I
                    : Full<Minus<T, U>, U, Increment<I> >

type Exp<T extends arr, U extends arr, R extends arr = [any]> =
            Length<U> extends 1
                ? Length<R> extends 1
                    ? T
                    : Multiply<R, T>
                : Length<U> extends 0
                    ? [any]
                    : Exp<T, Decrement<U>, Multiply<R, T>>

//////////////////////////////////////////////////////////////////////////////////////////////////
//test
//////////////////////////////////////////////////////////////////////////////////////////////////

type t1 = Increment<testArr>
type t2 = Decrement<testArr>
type t3 = Length<testArr>
type t4 = Plus<testArr, testArr>
type t5 = Minus<testArr, testArr>
type t6 = Minus<testArr, [1, 2, 3]>
type t7 = Length<FromNumber<10>>
type t8 = IsMore<testArr, testArr>
type t9 = IsMore<[2, 1, 3], [2, 3]>
type t10 = IsMore<[1], []>
type t11 = IsMore<[], []>
type t12 = IsMore<[1], [1]>
type t13 = IsEqual<testArr, testArr>
type t14 = IsEqual<[1], []>
type t15 = IsEqual<[1], [1]>
type t16 = IsMore<[2], []>
type t17 = IsMore<[], []>
type t18 = IsMore<[1], [1]>
type t19 = IsMore<[], [1]>
type t20 = Length<Multiply<FromNumber<2>, FromNumber<3>>>
type t21 = Length<Devide<FromNumber<0>, FromNumber<5>>>
type t22 = Length<Rest<FromNumber<8>, FromNumber<10>>>
type t24 = Length<Exp<FromNumber<4>, FromNumber<3>>>