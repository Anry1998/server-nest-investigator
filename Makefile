run:
	docker run -d -p 5000:5000 --name investigator-server-nest/2 --rm 

stop:
	docker stop investigator-server-nest