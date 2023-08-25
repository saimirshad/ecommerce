import {pgTable, varchar, integer, serial, real } from "drizzle-orm/pg-core"
import {drizzle} from "drizzle-orm/vercel-postgres"
import {sql} from '@vercel/postgres'

export const cartTable = pgTable("cart", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {
        length: 255
    }).notNull(),
    product_id: varchar("product_id", {
        length: 255
    }).notNull(),
    quantity: integer("quantity").notNull(),
    price: real("price").notNull(),
    image: varchar("image", {
        length: 255
    }).notNull(),
    title: varchar("title", {
        length: 255
    }).notNull(),

 })

 export const orderTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    name: varchar("name", {
        length: 255
    }).notNull(),
    email: varchar("email", {
        length: 255
    }).notNull(),
    address: varchar("address", {
        length: 255
    }).notNull(),
    payment_method: varchar("payment_method", {
        length: 255
    }).notNull(),
 })

 export const db = drizzle(sql)

function float(arg0: string) {
    throw new Error("Function not implemented.")
}
