const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Org.Internacionais' },
    'task-2': { id: 'task-2', content: 'Ind.Farm.LTDA' },
    'task-3': { id: 'task-3', content: 'Musc.Sound Live Cmp' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Cliente em Potencial',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Dados Confirmados',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Reunião Agendada',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;