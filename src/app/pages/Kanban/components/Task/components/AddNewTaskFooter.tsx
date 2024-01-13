import React, { useState } from 'react'
import { useKanbanDispatch, useKanbanSelector } from '../../../utils/store'
import { createNewTask } from '../../../redux/kanbanSlice'
import { LexoRank } from 'lexorank'

const getLastTaskInColumn = (columnId: any, columnMap: any, taskMap: any) => {
  let lastTask = null

  for (const taskId in taskMap) {
    const task = taskMap[taskId]
    console.log(task.Status, columnMap[columnId].Value)
    if (task.Status === columnMap[columnId].Value) {
      // Check if the task is the last one
      if (
        !lastTask ||
        LexoRank.parse(task.Rank).compareTo(LexoRank.parse(lastTask.Rank))
      ) {
        lastTask = task
      }
    }
  }

  return lastTask
}

const AddNewTaskFooter = ({ toggleOnOff, columnId }: any) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap)
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap)

  const dispatch = useKanbanDispatch()
  function handleCreateNewTask(event: any, data: any) {
    event.preventDefault()
    // Get the last task in the column
    const lastTask = getLastTaskInColumn(columnId, columnMap, taskMap)
    if (lastTask) {
      const newRank = LexoRank.parse(lastTask?.Rank)
        .genNext()
        .toString()
      dispatch(createNewTask({ columnId, newTaskTitle, newRank }))
    } else {
      dispatch(createNewTask({ columnId, newTaskTitle }))
    }

    setNewTaskTitle('')
  }
  return (
    // <form className="mt-auto w-[249px]">
    //   <textarea
    //     className=" rounded-8 overflow-wrap-break mt-auto h-[54px] max-h-[162px] min-h-[54px] resize-none overflow-hidden overflow-y-auto rounded-md border-none bg-[#ffffff] p-[8px] py-[12px] shadow-lg"
    //     placeholder="Enter a title for this card…"
    //     style={{ width: '100%' }}
    //     value={newTaskTitle}
    //     onChange={(e) => setNewTaskTitle(e.target.value)}
    //   ></textarea>
    //   <div className="flex items-center justify-start ">
    //     <button
    //       className="rounded-[3px] bg-[#579DFF] px-[12px] py-[6px]"
    //       onClick={(event) => handleCreateNewTask(event, newTaskTitle)}
    //     >
    //       Add card
    //     </button>
    //     <button
    //       className=""
    //       type="button"
    //       onClick={() => toggleOnOff()}
    //     >
    //       <span className="">
    //         <span
    //           className=""
    //           style={{ width: '24px', height: '24px' }}
    //         >
    //           <svg
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               clipRule="evenodd"
    //               d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
    //               fill="currentColor"
    //             ></path>
    //           </svg>
    //         </span>
    //       </span>
    //     </button>
    //   </div>
    // </form>
    <section
      className="flex flex-col rounded-[0.25rem] border-[1px] border-[#7f77f1] bg-transparent px-[10px] py-[4px] "
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleCreateNewTask(e, newTaskTitle)
        }
      }}
    >
      <div className="mb-1 text-[12px]">Project 1</div>
      <div className="mb-4 flex items-center justify-between">
        <span
          className="close-btn cursor-pointer"
          onClick={() => toggleOnOff()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <input
          type="text"
          autoFocus
          className="w-[80%] border-none text-[12px] outline-none"
          placeholder="Task name or type '/' for commands "
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <span className="assignees-picker icon-hover rounded-full border-[1px] border-dashed border-black p-[2px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 rounded-full "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </span>
      </div>
      <div className="footer flex items-center">
        <div className="3-icons ml-2 mr-auto flex items-start gap-x-6">
          <span className="icon-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          </span>
          <span className="icon-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </span>
          <span className="icon-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </span>
        </div>
        <button
          onClick={(event) => handleCreateNewTask(event, newTaskTitle)}
          className="save-btn h-[17px] rounded-[4px] bg-[#7f77f1] px-[6px] text-[10px] uppercase text-white opacity-60 hover:opacity-100"
        >
          Save
        </button>
      </div>
    </section>
  )
}

export default AddNewTaskFooter
