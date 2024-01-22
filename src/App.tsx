import {InputHTMLAttributes, useState} from "react";

interface Param {
  id: number;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
}
interface ParamValue {
  paramId: number;
  value: string | number;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

function ParamEditor({params, model}: Props) {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);
  const [showModel, setShowModel] = useState(false);

  function getModel(): Model {
    return { paramValues };
  }

  function getModelHandler() {
    setShowModel(!showModel);
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

  return (
      <div>
        <form>
          {params.map((param) => {
            const currentParamValue = paramValues.find(p => p.paramId === param.id).value || '';
            return (
                <div key={param.id}>
                  <label>{param.name}</label>
                  <input
                      type={param.type}
                      value={currentParamValue}
                      onChange={({target}) => handleChange(param.id, target.value)}
                  />
                </div>
            )
          })}
        </form>
        <button onClick={getModelHandler}>Show Model</button>
        {showModel && (
            <div>
              {getModel().paramValues.map(paramValue => {
                return <div>
                  {params.find(({id}) => id === paramValue.paramId)?.name}:
                  {paramValue.value}
                </div>
              })}
            </div>
        )}
      </div>
      )
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: 'text',
  },
  {
    id: 2,
    name: "Длина",
    type: 'text',
  },
  {
    id: 3,
    name: 'Цвет',
    type: 'color'
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
      value: "#ee4949"
    },
    {
      paramId: 4,
      value: 40,
    }
  ],
};

function App() {

  return (
    <>
      <ParamEditor params={params} model={model}/>
    </>
  )
}

export default App
