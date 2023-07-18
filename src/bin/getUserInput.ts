import inquirer from "inquirer";
import { installDependencies } from "./installDependencies";
import { getCloudProvider } from "./getCloudProvider";

function defineDependencies(key: string) {  
    const dependenciesCloudMap = new Map<string, string[]>([
        ['AWS', ['@aws-sdk/client-transcribe']],
        ['Azure', ['@azure/cognitiveservices-speech-sdk']],
        ['Google Cloud', ['@google-cloud/speech']],
    ]);

    return dependenciesCloudMap.get(key) as string[];
}

export function getUserInput() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'environment',
            message: 'Select your runtime environment:',
            choices: ['NodeJS', 'Browser'],
            default: 'NodeJS',
            single: true,
        },
    ]).then(async answers => {
        const env: string = answers.environment;

        if(env == 'NodeJS') {
            installDependencies(defineDependencies(await getCloudProvider()))
            return;
        }
        
        if(env == 'Browser') {
            installDependencies(defineDependencies('AWS'))
            return;
        }        

    }).catch(err => {
        console.log(err);
    })
}