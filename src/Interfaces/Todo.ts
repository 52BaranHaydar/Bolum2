/** Tek bir yapilacak kaydi */
export interface Todo {
  id: string
  baslik: string
  tamamlandi: boolean
  /** epoch ms — siralama icin kullandim */
  olusturulma: number
}
