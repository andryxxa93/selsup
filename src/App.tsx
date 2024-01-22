import './App.css'
import { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: 'string' | 'number';
}
interface ParamValue {
  paramId: number;
  value: string | number;
}

type Color = {
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

function ParamEditor({params, model}: Props) {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  function getModel(): Model {
    return { ...model, paramValues};
  }

  const handleChange = (paramId, value) => {
    const updatedValue = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value }
      }
      return paramValue;
    })
    setParamValues(updatedValue);
  }

  return <>
    {params.map((param) => {
      const currentParamValue = paramValues.find(p => p.paramId === param.id).value || '';
      return (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
                value={currentParamValue}
                onChange={({target}) => handleChange(param.id, target.value)}
            />
        </div>
      )
    })}
  </>
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: 'string',
  },
  {
    id: 2,
    name: "Длина",
    type: 'string',
  },
  {
    id: 3,
    name: 'Цвет',
    type: 'string'
  },
  {
    id: 4,
    name: 'Размер',
    type: 'number'
  }
];

const model: Model = {
  "paramValues": [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    },
    {
      paramId: 3,
      value: "красный"
    },
    {
      paramId: 4,
      value: 40,
    }
  ],
  colors: [{ name: 'красный' }, { name: 'голубой' }]
};

function App() {

  return (
    <>
      <ParamEditor params={params} model={model}/>
    </>
  )
}

export default App
