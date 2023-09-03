const buffer1 = Buffer.alloc(50)
const buffer2 = Buffer.from("inside the 🍔", "utf-8")

buffer1.write("Try to put 🍟 in every meal", "utf-8");
buffer2.copy(buffer1, 16)

console.log(buffer1.toString("utf-8")) // Try to put 🍟 inside the 🍔