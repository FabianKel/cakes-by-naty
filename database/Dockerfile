FROM postgres:13.4

# install app dependencies
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y make

RUN git clone https://github.com/michelp/pgjwt.git
RUN cd /pgjwt && make install