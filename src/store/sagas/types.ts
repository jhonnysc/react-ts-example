interface Payload<T> {
  type: T
}

export type Data<T, A> = {
  [P in keyof T]: P
} &
  Payload<A>
