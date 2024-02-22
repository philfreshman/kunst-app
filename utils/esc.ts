// export default function esc() {
//   function eventListener(closeModalOnEscape: any) {
//     onMounted(() => {
//       console.log("mounting")
//       window.addEventListener("keydown", closeModalOnEscape)
//     })
//
//     onBeforeUnmount(() => {
//       console.log("unmounting")
//       window.removeEventListener("keydown", closeModalOnEscape)
//     })
//   }
//
//   return { eventListener }
// }