import inquirer from "inquirer";
import installDependencies from "./installDependencies";

function defineDependencies(key: string) {  
    const dependenciesCloudMap = new Map<string, string[]>([
        ['AWS', ['@aws-sdk/client-transcribe']],
    ]);

    return dependenciesCloudMap.get(key) as string[];
}

export default function getUserInput() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'environment',
            message: 'Select your runtime environment:',
            choices: ['NodeJS', 'Browser'],
            default: 'NodeJS',
            single: true,
        },
    ]).then(async (answers: any) => {
        const env: string = answers.environment;

        if(env == 'NodeJS') {
            installDependencies(defineDependencies('AWS'))
            return;
        }
        
        if(env == 'Browser') {
            installDependencies(defineDependencies('AWS'))
            return;
        }        

    }).catch((err: any) => {
        console.log(err);
    })
}