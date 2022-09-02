run_client:
	echo "START"
	cd client && yarn dev

run_server:
	echo "START"
	cd server && yarn dev

yarn:
	echo "START"
	cd server && yarn
	cd client && yarn
