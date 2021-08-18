import { DynControl } from 'src/app/modules/dynamic-controls/models';

export interface TemplateData {
  key: string;
  name: string;
  value: ValueType;
}

export class Template {
  templateId?: number;
  name: string;
  description: string;
  body: TemplateBody; //Jobject
  lastUpdated: string;
  templateTypeId: number;
  templateTypeName: string;
  _departmentId?: number;
  validFromDate: string;
  validToDate: string;
  constructor(opt: { [key: string]: any } = {}) {
    if (opt['templateId']) { this.templateId = opt['templateId'] }
    this.name = opt['name'] || '';
    this.templateTypeId = opt['templateTypeId'] || null;
    this.templateTypeName = opt['templateTypeName'] || '';
    this.description = opt['description'] || '';
    this.lastUpdated = opt['lastUpdated'] || '';
    this.body = new TemplateBody(opt['body'] || {});
    this.validFromDate = opt['validFromDate'] || null;
    this.validToDate = opt['validToDate'] || null;
  }
}

export class TemplateBody {
  TemplateData: TemplateData[];
  PIAFTemplate: PIAFTemplate;
  PIAFAttributes: PIAFAttributes;
  XML: string[];
  Excel: string[];
  DatabaseTable: string[];
  Datasource: Attribute[];
  dashboard: Array<DynControl>;
  gridsterOptions: {};
  toNotifyUserIdList: string[];

  constructor(opt: { [key: string]: any } = {}) {
    this.TemplateData = opt['TemplateData'] || [];
    this.PIAFTemplate = opt['PIAFTemplate'] || {};
    this.PIAFAttributes = opt['PIAFAttributes'] || {};
    this.XML = opt['XML'] || [];
    this. toNotifyUserIdList = opt['toNotifyUserIdList'] || [];
    this.Excel = opt['Excel'] || [];
    this.DatabaseTable = opt['DatabaseTable'] || [];
    this.Datasource = opt['Datasource'] || [];
    this.dashboard = opt['dashboard'] || [];
    this.gridsterOptions = opt['gridsterOptions'] || {};
  }
  get templateDataKV() {
    // return []
    const result = {};
    this.TemplateData.map(item => {
      result[item.key] = item.value;
    })
    return result;
  }
  set templateDataKV(data: {}) {
    const TemplateData = JSON.parse(JSON.stringify(this.TemplateData))
    Object.keys(data).map(key => {
      const tempData = TemplateData.find(i => i.key === key);
      if (tempData)
        tempData.value = data[key];
      else
        TemplateData.push({
          key,
          name: this.dashboard.find(control => control.controlId === key).name,
          value: data[key],
        })
      this.TemplateData = TemplateData;
    })
  }
};


type ValueType = number | string | boolean;

interface PIAFTemplate {
  TemplateName: string;
  StartTime: string;
  EndTime: string;
  EventName: string;
  Attributes: Attribute[];
};

interface PIAFAttributes {
  Timestamp: string;
  Attributes: Attribute[];
};

interface Attribute {
  attributeName: string,
  key: string
};
