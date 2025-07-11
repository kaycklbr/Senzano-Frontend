import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import InputGroup from "../../components/form/form-elements/InputGroup";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import ConviteDetails from "../../components/common/ConviteDetails";
import { CheckCircleIcon, CheckLineIcon, DocsIcon, InfoIcon, UserIcon } from "../../icons";
import { useEffect, useState } from "react";
import ConviteConfirmations from "../../components/common/ConviteConfirmations";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import api from "../../services/api";
import { toast } from "react-toastify";


const tabStyle = {
  unselected: 'hover:text-gray-900 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white',
  selected: 'active text-white bg-blue-700    dark:bg-blue-600"'
}

export default function ConviteEdit() {

  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') || 'info');
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(params?.id != 'criar');


  useEffect(() => {
    setIsEdit(params?.id != 'criar');
  }, [params]);

  useEffect(() => {
    setTab(searchParams.get('tab') || 'info');
  }, [ searchParams ]);

  return (
    <div>
      <PageBreadcrumb onBack={() => navigate('/admin/convites')} pageTitle={(isEdit ? 'Editar' : 'Criar') + " convite"} />

      <div className="">
        {isEdit && <ul className="overflow-auto flex md:min-w-[200px] gap-2 md:flex-wrap pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <Link
              to={('?tab=info')}
              className={"inline-flex items-center shadow px-4 py-3 rounded-lg w-full " + (tab == 'info' ? tabStyle.selected : tabStyle.unselected)} aria-current="page">
              <DocsIcon className={"me-2 text-xl " + (tab == 'info' ? 'text-white' : '')} />
              Informações
            </Link>
          </li>
          <li>
            <Link
              to={('?tab=confirmation')}
              className={"inline-flex items-center shadow px-4 py-3 whitespace-nowrap md:whitespace-normal rounded-lg w-full " + (tab == 'confirmation' ? tabStyle.selected : tabStyle.unselected)}>
              <CheckLineIcon className={"me-2 text-xl " + (tab == 'confirmation' ? 'text-white' : '')} />
              Confirmações de presença
            </Link>
          </li>
        </ul>}


        <div className=" bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg flex-1">
          {tab == 'info' &&
            <ConviteDetails isEdit={isEdit} />
          }
          {tab == 'confirmation' &&
            <ConviteConfirmations />
          }
        </div>
      </div>

    </div>
  );
}
