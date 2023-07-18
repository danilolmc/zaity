import inquirer from "inquirer"

export async function getCloudProvider() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'cloudProvider',
            message: 'Select your cloud provider:',
            choices: ['AWS', 'Azure', 'Google Cloud'],
            default: 'AWS',
            single: true,
        }
    ]);
    const { cloudProvider } = answers;
    return String(cloudProvider);

}