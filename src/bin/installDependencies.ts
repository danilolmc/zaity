import chalk from "chalk";
import { execa } from "execa";

export async function installDependencies(dependencies: string[]) {

	try {

		console.log('\n Installing dependencies...');
		
		for (const dependencie of dependencies) {
			process.stdout.write(`\n Installing ${dependencie} - Loading... ⌛`);
			try {
				await execa('npm', ['install', dependencie]);
				process.stdout.write('\r');
				process.stdout.write('\x1b[K');
				process.stdout.write(`\r Installing ${dependencie} - Done! ✅`);
			} catch (error: any) {
				console.log(chalk.red(`\nError on installing ${dependencie}, try it yourself by running npm install ${dependencie}!`));
			}
		}
		console.log(`\n\n${chalk.green("Success on setup, let's code! ")} ✅`);

	}catch(error: any) {
		console.log(error)
	}
}
