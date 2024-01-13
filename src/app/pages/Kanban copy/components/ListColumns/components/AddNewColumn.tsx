import React, { useEffect, useRef, useState } from 'react'
import { useKanbanDispatch, useKanbanSelector } from '../../../utils/store'
import { LexoRank } from 'lexorank'
import { createNewColumn } from '../../../redux/kanbanSlice'

const AddNewColumn = () => {
  const dispatch = useKanbanDispatch()
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap)
  const [newColTitle, setNewTaskTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleCreateNewColumn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newColTitle: string
  ) => {
    event.preventDefault()
    const currentLastColumn = Object.values(columnMap).pop()
    if (!currentLastColumn) return
    const newRank = LexoRank.parse(currentLastColumn?.Rank)
      .genNext()
      .toString()
    dispatch(createNewColumn({ newColumnValue: newColTitle, newRank }))
    setNewTaskTitle('')
  }
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [newColTitle])
  return (
    <section className="flex min-w-[249px] flex-col self-start rounded-[0.25rem] border-[1px] border-[#7f77f1] bg-transparent px-[10px] py-[4px]">
      <div className="mb-1 text-[12px]">Enter a new column</div>
      <div className="mb-4 flex items-center justify-between">
        <span className="close-btn cursor-pointer">
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
          ref={inputRef}
          type="text"
          className="w-[80%] border-none text-[12px] outline-none"
          placeholder="Column name or type '/' for commands "
          value={newColTitle}
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
          onClick={(event) => handleCreateNewColumn(event, newColTitle)}
          className="save-btn h-[17px] rounded-[4px] bg-[#7f77f1] px-[6px] text-[10px] uppercase text-white opacity-60 hover:opacity-100"
        >
          Save
        </button>
      </div>
    </section>
  )
}

export default AddNewColumn
