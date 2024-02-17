import { GeneratorDependency, GeneratorImport, GeneratorOptions, GeneratorVerbOptions } from 'orval';
export declare const generateVerbImports: ({ response, body, queryParams, params }: GeneratorVerbOptions) => GeneratorImport[];
export declare const ReactApiDataOrvalClient: () => () => {
    client: (verbOptions: GeneratorVerbOptions, options: GeneratorOptions) => {
        implementation: string;
        imports: GeneratorImport[];
    };
    header: () => string;
    dependencies: () => GeneratorDependency[];
    footer: () => string;
    title: () => string;
};
