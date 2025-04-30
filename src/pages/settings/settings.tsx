import {
    Input,
    Button,
    Dropdown,
    Space,
    MenuProps
  } from 'antd';
  import { useState } from 'react';
  import { DownOutlined } from '@ant-design/icons';
  import { useTranslation } from 'react-i18next';
  
  const specialtyItems: MenuProps['items'] = [
    {
      label: 'UZB',
      key: 'uz',
    },
    {
      label: 'RUS',
      key: 'ru',
    },
    {
      label: 'ENG',
      key: 'en',
    },
  ];
  
  const Settings = () => {
    const { t, i18n } = useTranslation();
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('UZB');
  
    const handleSpecialtyMenuClick: MenuProps['onClick'] = (e) => {
      const selected = specialtyItems.find(item => item?.key === e.key);
      if (selected) {
        setSelectedSpecialty(selected.label as string);
        i18n.changeLanguage(e.key);
      }
    };
  
    return (
      <>
        <div className="w-full h-[50px] flex justify-between border-b-2 border-[#DDDD]">
          <h1 className="font-semibold text-[26px] text-[#1C274C]">
            {t("settings.title")}
          </h1>
          <Dropdown menu={{ items: specialtyItems, onClick: handleSpecialtyMenuClick }}>
            <Button
              style={{
                width: "199px",
                height: "45px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Space>
                {selectedSpecialty}
              </Space>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
  
        <div className="mt-10 flex justify-center">
          <div className="flex gap-[20px]">
            <div className="flex flex-col gap-[5px]">
              <label className="font-medium text-[16px] text-[#1C274C]">{t("settings.faceId")}</label>
              <Input placeholder="1234567i" style={{ width: "199px", height: "45px" }} />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label className="font-medium text-[16px] text-[#1C274C]">{t("settings.apiId")}</label>
              <Input placeholder="55555555" style={{ width: "199px", height: "45px" }} />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label className="font-medium text-[16px] text-[#1C274C]">{t("settings.apiHash")}</label>
              <Input placeholder="b996cb497dfas365dd56" style={{ width: "199px", height: "45px" }} />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Settings;
  