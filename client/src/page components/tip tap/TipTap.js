// /* DEPENDENCIES */
// import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import React, { useState } from 'react'

// // Won't install...
// // npm i @tiptap/suggestion
// import Commands from './suggestion/commands'
// import getSuggestionItems from './suggestion/items'
// import renderItems from './suggestion/renderItems'
// import Stack from '@mui/material/Stack';


// /* COMPONENTS */
// import MenuBar from './MenuBar';

// const Tiptap = () => {

//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//         ],
//         content: '<p>Hello World!</p>',
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON()
//             console.log('TIP TAPPING: ', editor.content)         
//         },
//     })

//     return (
//         <>  
//             <Stack
//                 direction="column" 
//                 spacing={1}
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <MenuBar editor={editor} />
                
//                 <EditorContent editor={editor} />
//             </Stack>
//         </>
//     )
// };

// export default Tiptap