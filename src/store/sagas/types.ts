export type Data<T, A> = {
  [P in keyof T]: P
} & {
  type: T
}
