import { execa } from "execa";

export default async function installDependencies(dependencies: string[]) {

	try {

		console.log('\n Installing dependencies...');
		
		for (const dependencie of dependencies) {
			process.stdout.write(`\n Installing ${dependencie} - Loading... ⌛`);
			try {
				await execa('npm', ['install', dependencie]);
				process.stdout.write('\r');
				process.stdout.write('\x1b[K');
				process.stdout.write(`\r Installing ${dependencie} - Done! ✅`);
			} catch (error) {
				console.log('\x1b[31m%s\x1b[0m', `\nError on installing ${dependencie}, try it yourself by running npm install ${dependencie}!`);
			}
		}
		console.log('\x1b[32m%s\x1b[0m',"\n\nSuccess on setup, let's code! ✅");

	}catch(error) {
		console.log(error)
	}
}
