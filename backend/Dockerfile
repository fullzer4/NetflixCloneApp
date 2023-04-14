FROM rust:1.68

COPY . .

RUN cargo build --release

CMD ["./target/release/backend"]

EXPOSE 8080:8080