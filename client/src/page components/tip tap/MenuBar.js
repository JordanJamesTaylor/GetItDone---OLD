// /* DEPENDENCIES */
// import { Stack } from "@mui/system";
// import React from "react";

// const MenuBar = ({ editor }) => {
//     if(!editor){
//         return null
//     }

//     return (
//         <>
//             <Stack
//                 direction="row" 
//                 spacing={1}
//                 justifyContent="center"
//                 alignItems="center"
//             >   
//                 <button
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     className={editor.isActive('bold') ? 'is-active' : ''}
//                 >
//                 bold
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     className={editor.isActive('italic') ? 'is-active' : ''}
//                 >
//                 italic
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleStrike().run()}
//                     className={editor.isActive('strike') ? 'is-active' : ''}
//                 >
//                 strike
//                 </button>
//                 <button 
//                     onClick={() => editor.chain().focus().undo().run()}
//                 >
//                 undo
//                 </button>
//             </Stack>
//         </>
//     )
// };

// export default MenuBar
