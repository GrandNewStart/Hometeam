interface TaskProps {
    id: string,
    name: string,
    memberIds: string[],
    status: string,
    createdAt: Date,
    updatedAt: Date
}

export default TaskProps